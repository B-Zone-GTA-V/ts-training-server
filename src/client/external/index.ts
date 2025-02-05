import NativeUI from "./nativeui";
import UIMenuItem from "./nativeui/items/UIMenuItem";
import UIMenuListItem from "./nativeui/items/UIMenuListItem";
import ItemsCollection from "./nativeui/modules/ItemsCollection";
import Point from "./nativeui/utils/Point";

export class ExternalPackages {
    player = mp.players.local;

    todosMenus: any[] = [];

    menuRoupas: any = new NativeUI("Clothes", "", new Point(50, 50));

    components: {componentId: number, name: string, desc: string, items: any[], textures: any[], menu: any}[] = [
        {
            componentId: 1,
            name: "Masks",
            desc: "Select your mask.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 2,
            name: "Hair Style",
            desc: "Select your hair style.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 3,
            name: "Torso",
            desc: "Select your torso.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 4,
            name: "Legs",
            desc: "Select your legs.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 6,
            name: "Shoes",
            desc: "Select your shoes.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 7,
            name: "Accessories",
            desc: "Select your accessories.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 8,
            name: "Undershirts",
            desc: "Select your undershirts.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 9,
            name: "	Body Armors",
            desc: "Select your body armors.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 10,
            name: "Decals",
            desc: "Select your decals.",
            items: [],
            textures: [],
            menu: null
        },
        {
            componentId: 11,
            name: "Tops",
            desc: "Select your tops.",
            items: [],
            textures: [],
            menu: null
        },

    ];

    init() {
        mp.gui.chat.push(`External packages initialized.`);
        this.components.forEach((component) => {
            let i = 0;
            
            let menu = new UIMenuItem(component.name, component.desc);
    
            this.menuRoupas.AddItem(menu);
            
            for (i = 0; i <  this.player.getNumberOfDrawableVariations(component.componentId) + 1; i++) component.items.push(i.toString());
            let limit =  this.player.getNumberOfTextureVariations(1,  this.player.getDrawableVariation(component.componentId));
            for (i = 0; i < limit + 1; i++) component.textures.push(i.toString());
    
            component.menu = new NativeUI(component.name, "", new Point(50, 50));
            let items = new UIMenuListItem(component.name, component.desc, new ItemsCollection(component.items),  this.player.getDrawableVariation(1));
            let textures = new UIMenuListItem("Texture", "Select your texture.", new ItemsCollection(component.textures),  this.player.getTextureVariation(1));
            component.menu.AddItem(items);
            component.menu.AddItem(textures);
            component.menu.Visible = false;
            this.todosMenus.push(component.menu);
    
            component.menu.ListChange.on((item: any, _: any) => {
                let drawable = parseInt(items.SelectedItem.DisplayText);
                let texture = parseInt(textures.SelectedItem.DisplayText);
                switch (item) {
                    case items:
                        mp.events.callRemote('setClothes', component.componentId, drawable, 0);
                        component.textures = [];
                        for (i = 0; i <  this.player.getNumberOfTextureVariations(component.componentId,  this.player.getDrawableVariation(component.componentId)) + 1; i++) component.textures.push(i.toString());
                        textures.Collection = new ItemsCollection(component.textures).getListItems();
                        textures.Index = 0;
                    break
        
                    case textures:
                        mp.events.callRemote('setClothes', component.componentId, drawable, texture);
                }
            });
    
            this.menuRoupas.BindMenuToItem(component.menu, menu);
        });
    
        this.menuRoupas.Visible = false;
        this.todosMenus.push( this.menuRoupas);

        mp.keys.bind(0x72, false, () => {
            const value = this.components.some(el => el.menu.Visible) ? 1 : 0;
            if (this.menuRoupas.Visible | value) {
                this.todosMenus.forEach(function(element, _a, _b){element.Close()});
            } else {
                
                this.menuRoupas.Open();
                mp.gui.chat.show(false);
                mp.gui.cursor.visible = false;
            }
        });
    
        this.menuRoupas.MenuClose.on(() => {
            mp.gui.chat.show(true);
            mp.gui.cursor.visible = false;
        });
        return;
    }



    // Drawable
    // let chapeusDrawable = [];
    // for (i = 0; i < player.getNumberOfPropDrawableVariations(0) + 1; i++) chapeusDrawable.push(i.toString())
    // // Texture
    // let chapeusTexture = [];
    // let chapeusTextureLimite = player.getNumberOfPropTextureVariations(0, player.getPropIndex(0));
    // for (i = 0; i < chapeusTextureLimite + 1; i++) chapeusTexture.push(i.toString());

    // const menuRoupasChapeus: any = new Menu("Hats", "", new Point(50, 50));
    // let chapeusItem = new UIMenuListItem("Hats", "Select your hat.", new ItemsCollection(chapeusDrawable), player.getPropIndex(0));
    // let chapeusTextureItem = new UIMenuListItem("Color", "Select your hat's color.", new ItemsCollection(chapeusTexture), player.getPropTextureIndex(0));
    // menuRoupasChapeus.AddItem(chapeusItem);
    // menuRoupasChapeus.AddItem(chapeusTextureItem);
    // menuRoupasChapeus.Visible = false;
    // todosMenus.push(menuRoupasChapeus);

    // menuRoupasChapeus.ListChange.on((item: any, _: any) => {
    //     let drawable = parseInt(chapeusItem.SelectedItem.DisplayText);
    //     let texture = parseInt(chapeusTextureItem.SelectedItem.DisplayText);
    //     switch (item) {
    //         case chapeusItem:
    //             mp.events.callRemote('setProp', 0, drawable, 0);
    //             chapeusTextureNewArray = [];
    //             for (i = 0; i < player.getNumberOfPropTextureVariations(0, player.getPropIndex(0)) + 1; i++) chapeusTextureNewArray.push(i.toString());
    //             chapeusTextureItem.Collection = new nativeui.ItemsCollection(chapeusTextureNewArray).getListItems();
    //             chapeusTextureItem.Index = 0;
    //         break

    //         case chapeusTextureItem:
    //             mp.events.callRemote('setProp', 0, drawable, texture);
    //     }
    // });

    ///////////////////////////////////////////////////////
    // MENU ÓCULOS PROP 1
    ///////////////////////////////////////////////////////
}

const externalPackages = new ExternalPackages();
export { externalPackages };