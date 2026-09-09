interface GeoInfo {
    country: string;
    region: string;
    city: string;
    vpnOrProxy: boolean;
    proxyType: string;
}

interface DeviceInfo {
    deviceType: string;
    os: string;
    browser: string;
}

// The raw User-Agent string is ~90% identical boilerplate across every modern
// browser ("Mozilla/5.0 ... AppleWebKit/537.36 (KHTML, like Gecko)") — this
// pulls out just the three things actually worth a Sheet column.
function parseUserAgent(ua: string): DeviceInfo {
    const deviceType = /iPad|Tablet/i.test(ua) ? "Tablet" : /Mobile|Android|iPhone/i.test(ua) ? "Mobile" : "Desktop";

    let os = "Unknown";
    const androidVersion = ua.match(/Android ([\d.]+)/)?.[1];
    const iosVersion = ua.match(/OS ([\d_]+) like Mac OS X/)?.[1]?.replace(/_/g, ".");
    const macVersion = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, ".");
    if (androidVersion) os = `Android ${androidVersion}`;
    else if (iosVersion) os = `iOS ${iosVersion}`;
    else if (/Windows/i.test(ua)) os = "Windows";
    else if (macVersion) os = `macOS ${macVersion}`;
    else if (/Linux/i.test(ua)) os = "Linux";

    let browser = "Unknown";
    if (/Edg\//i.test(ua)) browser = "Edge";
    else if (/OPR\//i.test(ua)) browser = "Opera";
    else if (/Chrome\//i.test(ua)) browser = "Chrome";
    else if (/Firefox\//i.test(ua)) browser = "Firefox";
    else if (/Safari\//i.test(ua)) browser = "Safari";

    return { deviceType, os, browser };
}

async function lookupProxycheck(ip: string, fallback: GeoInfo): Promise<GeoInfo> {
    const key = process.env.PROXYCHECK_API_KEY;
    if (!key || ip === "unknown") return fallback;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(
            `https://proxycheck.io/v2/${ip}?key=${key}&vpn=1&asn=1`,
            { signal: controller.signal }
        );
        clearTimeout(timeout);

        const json = await res.json();
        const entry = json?.[ip];
        if (!entry) return fallback;

        return {
            country: entry.country ?? fallback.country,
            region: entry.region ?? fallback.region,
            city: entry.city ?? fallback.city,
            vpnOrProxy: entry.proxy === "yes",
            proxyType: entry.type ?? "",
        };
    } catch {
        return fallback;
    }
}

async function forwardToSheet(record: Record<string, unknown>) {
    const webhook = process.env.SHEETS_WEBHOOK_URL;
    if (!webhook) return;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record),
            signal: controller.signal,
        });
        clearTimeout(timeout);
    } catch {
        // Sheet unreachable — visit is still logged nowhere, but this must never break the request
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const path = typeof body.path === "string" ? body.path : "";
        const referrer = typeof body.referrer === "string" ? body.referrer : "";
        const snapshot = body.metadata ?? {};

        const event = typeof body.event === "string" ? body.event : "enter";
        const previousPage = typeof body.previousPage === "string" ? body.previousPage : "";
        const timeOnPrevPageSec =
            typeof body.previousPageDurationMs === "number" ? Math.round(body.previousPageDurationMs / 1000) : "";

        // hugCount is a genuinely cross-page cumulative score, so it's the one
        // field still read from the generic snapshot — it's meant to show the
        // running total as of every visit. Everything else below is only ever
        // sent by its own page's dedicated leave-beacon, tagged with the matching
        // `path` above, so it can't leak onto an unrelated row for whatever page
        // gets visited next.
        const hugCount = typeof snapshot.hugCount === "number" ? snapshot.hugCount : "";
        const pinAttempt = typeof body.pinAttempt === "string" ? body.pinAttempt : "";
        const selections = typeof body.selections === "string" ? body.selections : "";
        const dateResult = typeof body.dateResult === "string" ? body.dateResult : "";
        const capsuleSealed = typeof body.capsuleSealed === "boolean" ? body.capsuleSealed : "";
        const capsulePromise = typeof body.capsulePromise === "string" ? body.capsulePromise : "";
        const milestonesSeen = typeof body.milestonesSeen === "string" ? body.milestonesSeen : "";
        const gardenLeaves = typeof body.gardenLeaves === "number" ? body.gardenLeaves : "";
        const cubeFaceSequence = typeof body.cubeFaceSequence === "string" ? body.cubeFaceSequence : "";
        const lettersOpened = typeof body.lettersOpened === "string" ? body.lettersOpened : "";
        const lettersFavorited = typeof body.lettersFavorited === "string" ? body.lettersFavorited : "";
        const poemsRevealed = typeof body.poemsRevealed === "string" ? body.poemsRevealed : "";
        const poemsFavorited = typeof body.poemsFavorited === "string" ? body.poemsFavorited : "";
        const charactersJoined = typeof body.charactersJoined === "boolean" ? body.charactersJoined : "";

        const forwardedFor = req.headers.get("x-forwarded-for") ?? "";
        const ip = forwardedFor.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
        const { deviceType, os, browser } = parseUserAgent(req.headers.get("user-agent") ?? "");

        const fallbackGeo: GeoInfo = {
            country: req.headers.get("x-vercel-ip-country") ?? "",
            region: req.headers.get("x-vercel-ip-country-region") ?? "",
            city: req.headers.get("x-vercel-ip-city") ?? "",
            vpnOrProxy: false,
            proxyType: "",
        };

        const geo = await lookupProxycheck(ip, fallbackGeo);

        const record = {
            timestamp: new Date().toISOString(),
            path,
            referrer,
            ip,
            deviceType,
            os,
            browser,
            ...geo,
            event,
            previousPage,
            timeOnPrevPageSec,
            selections,
            hugCount,
            dateResult,
            capsuleSealed,
            pinAttempt,
            milestonesSeen,
            gardenLeaves,
            cubeFaceSequence,
            capsulePromise,
            lettersOpened,
            lettersFavorited,
            poemsRevealed,
            poemsFavorited,
            charactersJoined,
        };

        await forwardToSheet(record);

        return Response.json({ ok: true });
    } catch {
        return Response.json({ ok: false });
    }
}
