/**
 * 数据存储模块
 * 包含菜单导航、卡片分组和卡片信息
 */

const DataStore = {
    // 导航菜单数据
    navigation: [
        { id: 'company', name: '搜索网站', isActive: true },
        { id: 'department', name: '视频网站', isActive: false },
        { id: '7s', name: '音乐网站', isActive: false },
        { id: 'safety', name: '安全规则', isActive: false },
        { id: 'quality', name: '质量规则', isActive: false },
        { id: 'production', name: '生产规则', isActive: false },
        { id: 'equipment', name: '设备规则', isActive: false },
        { id: 'environment', name: '环境规则', isActive: false },
        { id: 'energy', name: '能源规则', isActive: false },
        { id: 'info', name: '信息规则', isActive: false },
        { id: 'other', name: '其他规则', isActive: false }
    ],
    
    // 卡片数据
    cards: {
        // 公司规则制度
        company: [
            {
                groupName: '业务A',
                items: [
                    { 
                        title: '规则1', 
                        icon: '👩‍💼', 
                        url: 'https://doubao.com', 
                        cardType: 'card1',
                        description: '这是关于规则1的简要描述，介绍了规则的主要内容和适用范围。',
                        iconUrl: 'https://www.google.com/favicon.ico'
                    },
                    { 
                        title: '规则1-2', 
                        icon: '📑', 
                        url: '#', 
                        cardType: 'card4',
                        description: '规则1-2的详细说明，包含了实施细则和注意事项。'
                    }
                ]
            },
            {
                groupName: '业务B',
                items: [
                    { 
                        title: '规则2', 
                        icon: '💡', 
                        url: 'https://llm-pricing-table.com', 
                        cardType: 'card2',
                        description: '规则2适用于特定业务场景，详细规定了操作流程。',
                        iconUrl: 'https://www.baidu.com/favicon.ico'
                    },
                    { 
                        title: '规则3', 
                        icon: '🛤️', 
                        url: 'https://runwayml.com', 
                        cardType: 'card3',
                        description: '规则3是对特殊情况的补充说明，提供了处理异常的指导。',
                        iconUrl: 'https://www.bing.com/favicon.ico'
                    },
                    { 
                        title: '规则4', 
                        icon: '📊', 
                        url: '#', 
                        cardType: 'card5',
                        description: '规则4包含了数据处理和报表生成的标准流程。'
                    }
                ]
            }
        ],
        
        // 部门规则制度
        department: [
            {
                groupName: '部门A',
                items: [
                    { 
                        title: '部门规则1', 
                        icon: '👥', 
                        url: '#', 
                        cardType: 'card1',
                        description: '部门A的基本工作规范和职责划分。'
                    },
                    { 
                        title: '部门规则2', 
                        icon: '📋', 
                        url: '#', 
                        cardType: 'card2',
                        description: '部门内部沟通协作和任务分配的流程规定。'
                    }
                ]
            },
            {
                groupName: '部门B',
                items: [
                    { 
                        title: '部门规则3', 
                        icon: '📊', 
                        url: '#', 
                        cardType: 'card3',
                        description: '部门B的绩效考核标准和评估方法。'
                    }
                ]
            }
        ],
        
        // 7S规则
        '7s': [
            {
                groupName: '整理整顿',
                items: [
                    { 
                        title: '7S规则1', 
                        icon: '🧹', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '7S规则2', 
                        icon: '📦', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            },
            {
                groupName: '清扫清洁',
                items: [
                    { 
                        title: '7S规则3', 
                        icon: '🧼', 
                        url: '#', 
                        cardType: 'card3' 
                    }
                ]
            }
        ],
        
        // 安全规则
        safety: [
            {
                groupName: '生产安全',
                items: [
                    { 
                        title: '安全规则1', 
                        icon: '🛡️', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '安全规则2', 
                        icon: '⚠️', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            },
            {
                groupName: '消防安全',
                items: [
                    { 
                        title: '安全规则3', 
                        icon: '🚒', 
                        url: '#', 
                        cardType: 'card3' 
                    }
                ]
            }
        ],
        
        // 质量规则
        quality: [
            {
                groupName: '质量控制',
                items: [
                    { 
                        title: '质量规则1', 
                        icon: '🎯', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '质量规则2', 
                        icon: '📏', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            }
        ],
        
        // 生产规则
        production: [
            {
                groupName: '生产管理',
                items: [
                    { 
                        title: '生产规则1', 
                        icon: '🏭', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '生产规则2', 
                        icon: '⚙️', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            }
        ],
        
        // 设备规则
        equipment: [
            {
                groupName: '设备维护',
                items: [
                    { 
                        title: '设备规则1', 
                        icon: '🔧', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '设备规则2', 
                        icon: '🔨', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            }
        ],
        
        // 环境规则
        environment: [
            {
                groupName: '环境保护',
                items: [
                    { 
                        title: '环境规则1', 
                        icon: '🌱', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '环境规则2', 
                        icon: '♻️', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            }
        ],
        
        // 能源规则
        energy: [
            {
                groupName: '能源管理',
                items: [
                    { 
                        title: '能源规则1', 
                        icon: '⚡', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '能源规则2', 
                        icon: '💡', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            }
        ],
        
        // 信息规则
        info: [
            {
                groupName: '信息管理',
                items: [
                    { 
                        title: '信息规则1', 
                        icon: '💻', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '信息规则2', 
                        icon: '🔒', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            }
        ],
        
        // 其他规则
        other: [
            {
                groupName: '其他管理',
                items: [
                    { 
                        title: '其他规则1', 
                        icon: '📝', 
                        url: '#', 
                        cardType: 'card1' 
                    },
                    { 
                        title: '其他规则2', 
                        icon: '📌', 
                        url: '#', 
                        cardType: 'card2' 
                    }
                ]
            }
        ]
    }
};

export default DataStore; 