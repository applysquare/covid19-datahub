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
    const data = await (await fetch('https://api.covid19api.com/summary')).json();
    data.Countries.map(country => {
        createNode(processResult({
            result: {
                id: country.Slug,
                data: country,
            },
            type: 'Covid19Country',
        }));
    });
};
