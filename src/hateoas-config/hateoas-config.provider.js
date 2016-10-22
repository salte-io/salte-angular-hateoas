/* @ngInject */
export default function $hateoasConfig() {
    let config = {
        keys: {
            links: '_links',
            embedded: '_embedded'
        },
        readonly: true
    };

    this.setConfig = (value) => {
        config = value;
    };

    this.setLinksKey = (value) => {
        config.keys.links = value;
    };

    this.setEmbeddedKey = (value) => {
        config.keys.embedded = value;
    };

    this.setReadOnly = (value) => {
        config.readonly = value;
    };

    this.$get = function() {
        return {
            getConfig: () => {
                return config;
            },
            getLinksKey: () => {
                return config.keys.links;
            },
            getEmbeddedKey: () => {
                return config.keys.embedded;
            },
            getReadOnly: () => {
                return config.readonly;
            }
        };
    };
}
