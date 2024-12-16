export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', menus: [
            {
                name: 'menu.system.system-administrator.header',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
                    { name: 'menu.system.system-administrator.category-manage', link: '/system/category-manage' },
                    { name: 'menu.system.system-administrator.support-manage', link: '/system/support-manage' },
                    { name: 'menu.system.system-administrator.symptom-manage', link: '/system/symptom-manage' },
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];