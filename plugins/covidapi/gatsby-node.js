const fetch = require('node-fetch');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions;

    // Helper function that processes a result to match Gatsby's node structure
    const processResult = ({ result, type }) => {
        const nodeId = createNodeId(`${type}-${result.id}`)
        const nodeContent = JSON.stringify(result)
        const nodeData = Object.assign({}, result, {
            id: nodeId,
            endpointId: result.id,
            parent: null,
            children: [],
            internal: {
                type: type,
                content: nodeContent,
                contentDigest: createContentDigest(result),
            },
        })

        return nodeData
    }

    const walkArea = (area, emit) => {
        const { areas, ...rest } = area;

        if (rest.id) {
            emit(rest);
        }
        if (areas && areas.length) {
            areas.forEach(a => walkArea(a, emit));
        }
    };

    // const data = await (await fetch('https://bing.com/covid/data')).json();
    // Use a mock one since bing is no long providing data.
    const data = {
        id: "mars",
        "displayName": "Mars",
        "areas": [],
        totalConfirmed: 0,
        totalDeaths: 0,
        totalRecovered: 0,
        totalRecoveredDelta: 0,
        totalConfirmedDelta: 0,
        totalDeathsDelta: 0,
    };
    walkArea(data, (area) => {
        createNode(processResult({
            result: {
                id: area.id,
                data: area,
            },
            type: 'Covid19Area',
        }));
    });

    // data.Countries.map(country => {
    //     createNode(processResult({
    //         result: {
    //             id: country.CountryCode,
    //             data: country,
    //         },
    //         type: 'Covid19Country',
    //     }));
    // });
};
