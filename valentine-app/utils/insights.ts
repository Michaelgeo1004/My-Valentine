export interface HeartbeatData {
    timestamp: string;
    selections: string[];
    dateResult: string | null;
    hugCount: number;
    capsuleSealed: boolean;
    lastPage: string;
    lastUpdated?: string;
    count?: number;
    gardenLeaves?: number;
}

import { useEffect, useRef } from 'react';

// Runs `callback` only on a genuine component unmount (real navigation away),
// not React Strict Mode's dev-only mount→unmount→remount double-invoke — that
// simulated cleanup fires within the same tick, so deferring the check by one
// macrotask is enough to tell them apart: if the component has already
// remounted by the time the timeout runs, this was the fake one.
export function useOnRealUnmount(callback: () => void) {
    const isMountedRef = useRef(false);
    const callbackRef = useRef(callback);

    // Refs must be written in an effect, not during render — keeps callbackRef
    // pointing at the latest closure without re-running the mount/unmount effect below.
    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
            setTimeout(() => {
                if (!isMountedRef.current) callbackRef.current();
            }, 0);
        };
    }, []);
}

export const getHeartbeatSnapshot = (): HeartbeatData | null => {
    try {
        const raw = localStorage.getItem('_v_heartbeat');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const logInsight = (key: string, value: any) => {
    try {
        const raw = localStorage.getItem('_v_heartbeat');
        const data: HeartbeatData = raw ? JSON.parse(raw) : {
            timestamp: new Date().toISOString(),
            selections: [],
            dateResult: null,
            hugCount: 0,
            capsuleSealed: false,
            lastPage: ""
        };

        if (key === 'selections') {
            data.selections = value;
            data.count = value.length;
            // Award 5 points per priority selected
            data.hugCount += 5;
        } else if (key === 'dateResult') {
            data.dateResult = value;
        } else if (key === 'hugCount') {
            data.hugCount += (typeof value === 'number' ? value : 1);
        } else if (key === 'capsuleSealed') {
            if (!data.capsuleSealed && value) {
                data.hugCount += 50; // Big bonus for eternal commitment
            }
            data.capsuleSealed = value;
        } else if (key === 'lastPage') {
            data.lastPage = value;
        } else if (key === 'gardenLeaves') {
            data.gardenLeaves = value;
        }

        data.lastUpdated = new Date().toISOString();
        localStorage.setItem('_v_heartbeat', JSON.stringify(data));
    } catch (e) {
        console.warn("Silent log failed", e);
    }
};

// Fires a tracking beacon tagged to a specific page, independent of the
// generic per-navigation one in template.tsx — used when a page has its own
// stat (leaves drawn, cube face) that only makes sense attributed to itself,
// rather than leaking into whatever page gets visited next.
export const sendTrackBeacon = (payload: Record<string, unknown>) => {
    try {
        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true,
        }).catch(() => { });
    } catch {
        // tracking must never affect the story experience
    }
};
