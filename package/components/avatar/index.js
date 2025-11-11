class MonadAvatar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['src', 'alt', 'size'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const src = this.getAttribute('src') || '';
        const alt = this.getAttribute('alt') || 'Avatar';
        const size = this.getAttribute('size') || '48';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }
                .avatar {
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    object-fit: cover;
                    background-color: #f0f0f0;
                }
            </style>
            <img class="avatar" src="${src}" alt="${alt}" />
        `;
    }
}

customElements.define('m-avatar', MonadAvatar);

export default MonadAvatar;