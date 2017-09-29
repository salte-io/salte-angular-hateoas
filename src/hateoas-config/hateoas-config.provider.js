export default class $hateoasConfigProvider {
  constructor() {
    this.config = {
      keys: {
        links: '_links',
        embedded: '_embedded'
      },
      readonly: true
    };
  }

  setConfig(value) {
    this.config = value;
  }

  setLinksKey(value) {
    this.config.keys.links = value;
  }

  setEmbeddedKey(value) {
    this.config.keys.embedded = value;
  }

  setReadOnly(value) {
    this.config.readonly = value;
  }

  $get() {
    return {
      getConfig: () => {
        return this.config;
      },
      getLinksKey: () => {
        return this.config.keys.links;
      },
      getEmbeddedKey: () => {
        return this.config.keys.embedded;
      },
      getReadOnly: () => {
        return this.config.readonly;
      }
    };
  }
}
