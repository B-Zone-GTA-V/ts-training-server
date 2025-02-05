/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-inner-declarations */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
import { ItemsCollection, Menu, Point, UIMenuItem, UIMenuListItem } from './nativeui/index';

export namespace ExternalPackages {
    let player = mp.players.local;

    let todosMenus = [];

    let menuRoupas: any = new Menu("Clothes", "", new Point(50, 50));

    let components: {componentId: number, name: string, desc: string, items: any[], textures: any[], menu: any}[] = [
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

    components.forEach((component) => {
        let i = 0;
        
        let menu = new UIMenuItem(component.name, component.desc);

        menuRoupas.AddItem(menu);
        
        for (i = 0; i < player.getNumberOfDrawableVariations(component.componentId) + 1; i++) component.items.push(i.toString());
        let limit = player.getNumberOfTextureVariations(1, player.getDrawableVariation(component.componentId));
        for (i = 0; i < limit + 1; i++) component.textures.push(i.toString());

        component.menu = new Menu(component.name, "", new Point(50, 50));
        let items = new UIMenuListItem(component.name, component.desc, new ItemsCollection(component.items), player.getDrawableVariation(1));
        let textures = new UIMenuListItem("Texture", "Select your texture.", new ItemsCollection(component.textures), player.getTextureVariation(1));
        component.menu.AddItem(items);
        component.menu.AddItem(textures);
        component.menu.Visible = false;
        todosMenus.push(component.menu);

        component.menu.ListChange.on((item: any, _: any) => {
            let drawable = parseInt(items.SelectedItem.DisplayText);
            let texture = parseInt(textures.SelectedItem.DisplayText);
            switch (item) {
                case items:
                    mp.events.callRemote('setClothes', component.componentId, drawable, 0);
                    component.textures = [];
                    for (i = 0; i < player.getNumberOfTextureVariations(component.componentId, player.getDrawableVariation(component.componentId)) + 1; i++) component.textures.push(i.toString());
                    textures.Collection = new ItemsCollection(component.textures).getListItems();
                    textures.Index = 0;
                break
    
                case textures:
                    mp.events.callRemote('setClothes', component.componentId, drawable, texture);
            }
        });

        menuRoupas.BindMenuToItem(component.menu, menu);
    });

    menuRoupas.Visible = false;
    todosMenus.push(menuRoupas);

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
    //             chapeusTextureItem.Collection = new NativeUI.ItemsCollection(chapeusTextureNewArray).getListItems();
    //             chapeusTextureItem.Index = 0;
    //         break

    //         case chapeusTextureItem:
    //             mp.events.callRemote('setProp', 0, drawable, texture);
    //     }
    // });

    ///////////////////////////////////////////////////////
    // MENU ÓCULOS PROP 1
    ///////////////////////////////////////////////////////

    mp.keys.bind(0x72, false, () => {
        const value = components.some(el => el.menu.Visible) ? 1 : 0;
        if (menuRoupas.Visible | value) {
            todosMenus.forEach(function(element, _a, _b){element.Close()});
        } else {
            
            menuRoupas.Open();
            mp.gui.chat.show(false);
            mp.gui.cursor.visible = false;
        }
    });

    menuRoupas.MenuClose.on(() => {
        mp.gui.chat.show(true);
        mp.gui.cursor.visible = false;
    });
}