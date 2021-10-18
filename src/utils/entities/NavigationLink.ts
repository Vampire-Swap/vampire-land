export class NavigationLink {
    public displayedContent: string;
    public route: string;
    public icon?: string;

    constructor(displayedContent: string, route: string, icon?: string) {
        this.displayedContent = displayedContent;
        this.route = route;
        this.icon = icon;
    }
}