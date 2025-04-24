export class CValuesetTerm {

    private csCodeField = '';
    private csDescriptionField = '';
    private arrPropertyDetailsField!: Array<CPropertyDetails>;

    public get csCode(): string {
        return this.csCodeField;
    }
    public set csCode(value: string) {
        if ((Object.is(this.csCodeField, value) != true)) {
            this.csCodeField = value;
        }
    }

    public get csDescription(): string {
        return this.csDescriptionField;
    }
    public set csDescription(value: string) {
        if ((Object.is(this.csDescriptionField, value) != true)) {
            this.csDescriptionField = value;
        }
    }

    public get arrPropertyDetails(): Array<CPropertyDetails> {
        return this.arrPropertyDetailsField;
    }
    public set arrPropertyDetails(value: Array<CPropertyDetails>) {
        if ((Object.is(this.arrPropertyDetailsField, value) != true)) {
            this.arrPropertyDetailsField = value;
        }
    }

}

export class CPropertyDetails {

    private csNameField = '';
    private csValueField = '';

    public get csName(): string {
        return this.csNameField;
    }
    public set csName(value: string) {
        if ((Object.is(this.csNameField, value) != true)) {
            this.csNameField = value;
        }
    }

    public get csValue(): string {
        return this.csValueField;
    }
    public set csValue(value: string) {
        if ((Object.is(this.csValueField, value) != true)) {
            this.csValueField = value;
        }
    }

}