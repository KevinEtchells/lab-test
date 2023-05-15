interface Window {
    plausible: any
}

interface Variant {
    html?: string,
    container?: string,
    css?: string,
    javascript?: Function,
    variantIndex: string
}

const Lab = class {
   
    name: string;
    variants: Variant[] = [];
    chosenVariant: Variant;
    collectionUrl: string | undefined;

    report = (property: string) => {
        if (this.collectionUrl) {
            fetch(`${this.collectionUrl}\?test=${this.name}&variant=${this.chosenVariant.variantIndex}&property=${property}`);
        } else {
            window.plausible(this.name, {props: {variant: this.chosenVariant.variantIndex, property: property}});
        }
    };
   
    constructor(name: string, collectionUrl?: string) {
        this.name = name;

        if (collectionUrl) {
            this.collectionUrl = collectionUrl;
        } else {
            // setup Plausible
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
        }
    }

    addVariant(code?: {html: string, container: string, css: string, javascript: Function}) {
        this.variants.push({
            html: code?.html,
            container: code?.container,
            css: code?.css,
            javascript: code?.javascript,
            variantIndex: ['A', 'B', 'C'][this.variants.length]
        });
    }

    start() {

        const index = Math.floor(Math.random() * this.variants.length);
        this.chosenVariant = this.variants[index];
        this.report('view');

        if (this.chosenVariant.html) {
            let container = document.querySelector(this.chosenVariant.container || 'body');
            container?.insertAdjacentHTML('afterbegin', this.chosenVariant.html);
        }
        if (this.chosenVariant.css) {
            let styles = document.createElement('style');
            styles.innerText = this.chosenVariant.css
            document.head.appendChild(styles);
        }
        if (this.chosenVariant.javascript) {
            this.chosenVariant.javascript(this.report);
        }

    }

};