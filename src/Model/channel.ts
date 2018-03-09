class ChannelModel {
    private id: number;
    private name: string;
    private icon: string | null;

    public constructor(id: number, name: string, icon: string | null) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getIcon(): string | null {
        return this.icon;
    }

}

export default ChannelModel;
