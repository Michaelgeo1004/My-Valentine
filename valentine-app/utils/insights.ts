export const logInsight = (key: string, value: any) => {
    try {
        const raw = localStorage.getItem('_v_heartbeat');
        let data = raw ? JSON.parse(raw) : {
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
        }

        data.lastUpdated = new Date().toISOString();
        localStorage.setItem('_v_heartbeat', JSON.stringify(data));
    } catch (e) {
        console.warn("Silent log failed", e);
    }
};
