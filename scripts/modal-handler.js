/**
 * 模态框处理模块
 * 处理模态框显示/隐藏、网站信息获取和本地存储功能
 */

import DataStore from './data-store.js';

const ModalHandler = {
    /**
     * 初始化模态框处理器
     */
    init: function() {
        // 获取DOM元素
        this.modal = document.getElementById('add-rule-modal');
        this.closeButtons = this.modal.querySelectorAll('.modal-close, .modal-close-btn');
        this.fetchButton = document.getElementById('fetch-website-info');
        this.saveButton = document.getElementById('save-rule-btn');
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.websitePreview = document.getElementById('website-preview');
        this.iconSelector = document.getElementById('icon-selector');
        
        // 表单元素
        this.urlInput = document.getElementById('rule-url');
        this.titleInput = document.getElementById('rule-title');
        this.descriptionInput = document.getElementById('rule-description');
        this.selectedIconInput = document.getElementById('selected-icon');
        this.cardStyleSelect = document.getElementById('card-style');
        
        // 卡片样式颜色预览元素
        this.cardStylePreviews = document.querySelectorAll('.color-preview[data-value^="card"]');
        
        // 预览元素
        this.previewIcon = document.getElementById('preview-icon');
        this.previewTitle = document.getElementById('preview-title');
        this.previewDescription = document.getElementById('preview-description');
        
        // 存储当前操作的分组和类型
        this.currentGroupName = '';
        this.currentCardType = '';
        this.isEditMode = false;
        this.editCardData = null;
        this.businessGroupIndex = -1;
        this.cardIndex = -1;
        
        // 动态加载图标
        this.loadIconOptions();
        
        // 绑定事件处理函数
        this.bindEvents();
    },
    
    /**
     * 动态加载图标选项
     */
    loadIconOptions: function() {
        // 清空图标选择器
        this.iconSelector.innerHTML = '';
        
        // 获取图标文件列表并返回Promise
        return this.fetchIconFiles().then(iconFiles => {
            // 如果没有找到图标文件，使用默认图标
            if (!iconFiles || iconFiles.length === 0) {
                const defaultIcon = 'a-hua1.png';
                this.createIconOption(defaultIcon);
                this.selectedIconInput.value = defaultIcon;
                return;
            }
            
            // 创建图标选项
            iconFiles.forEach((iconFile, index) => {
                this.createIconOption(iconFile);
                
                // 默认选中第一个图标
                if (index === 0) {
                    const firstOption = this.iconSelector.querySelector('.icon-option');
                    if (firstOption) {
                        firstOption.classList.add('selected');
                        this.selectedIconInput.value = iconFile;
                    }
                }
            });
            
            // 重新绑定图标选择事件
            this.bindIconSelectEvents();
        });
    },
    
    /**
     * 获取图标文件列表
     * @returns {Promise<string[]>} 图标文件名数组
     */
    fetchIconFiles: function() {
        return new Promise((resolve) => {
            // 动态从web-icon文件夹加载所有图标
            // 由于浏览器安全限制，无法直接读取文件系统
            // 这里我们检索从images/web-icon中的所有PNG文件
            const iconFiles = [
                'a-hua1.png', 'a-hua2.png', 'a-hua5.png', 'a-hua6.png', 'a-hua7.png',
                'a-hua12.png', 'a-hua13.png', 'a-hua15.png', 'a-hua17.png', 'a-hua18.png',
                'a-hua23.png', 'a-hua24.png', 'a-hua26.png', 'a-hua28.png', 'a-hua29.png',
                'a-hua31.png', 'a-hua32.png', 'a-hua33.png', 'a-hua36.png', 'a-hua40.png',
                'a-hua41.png', 'a-hua44.png'
            ];
            
            // 按字母顺序排序
            iconFiles.sort();
            
            resolve(iconFiles);
        });
    },
    
    /**
     * 创建图标选项
     * @param {string} iconFile - 图标文件名
     */
    createIconOption: function(iconFile) {
        const option = document.createElement('div');
        option.className = 'icon-option';
        option.setAttribute('data-icon', iconFile);
        
        const img = document.createElement('img');
        img.src = `images/web-icon/${iconFile}`;
        img.alt = iconFile;
        
        option.appendChild(img);
        this.iconSelector.appendChild(option);
    },
    
    /**
     * 绑定图标选择事件
     */
    bindIconSelectEvents: function() {
        this.iconOptions = document.querySelectorAll('.icon-option');
        
        this.iconOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.iconOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.selectedIconInput.value = option.getAttribute('data-icon');
            });
        });
    },
    
    /**
     * 绑定事件处理函数
     */
    bindEvents: function() {
        // 关闭模态框
        this.closeButtons.forEach(button => {
            button.addEventListener('click', this.hideModal.bind(this));
        });
        
        // 点击模态框外部关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // 获取网站信息
        this.fetchButton.addEventListener('click', this.fetchWebsiteInfo.bind(this));
        
        // 保存规则
        this.saveButton.addEventListener('click', this.saveRule.bind(this));
        
        // 卡片样式下拉框变更事件
        this.cardStyleSelect.addEventListener('change', this.handleCardStyleChange.bind(this));
        
        // 卡片样式颜色预览点击事件
        this.cardStylePreviews.forEach(preview => {
            preview.addEventListener('click', this.handleCardStylePreviewClick.bind(this));
        });
    },
    
    /**
     * 处理卡片样式选择变更
     */
    handleCardStyleChange: function(e) {
        // 更新预览图标的选中状态
        const selectedValue = e.target.value;
        this.updateCardStylePreviewSelection(selectedValue);
    },
    
    /**
     * 处理卡片样式颜色预览点击
     */
    handleCardStylePreviewClick: function(e) {
        const clickedPreview = e.target;
        const styleValue = clickedPreview.getAttribute('data-value');
        
        // 更新下拉框选中值
        this.cardStyleSelect.value = styleValue;
        
        // 更新预览图标的选中状态
        this.updateCardStylePreviewSelection(styleValue);
    },
    
    /**
     * 更新卡片样式颜色预览的选择状态
     * @param {string} selectedValue - 选中的卡片样式值
     */
    updateCardStylePreviewSelection: function(selectedValue) {
        // 移除所有预览的选中状态
        this.cardStylePreviews.forEach(preview => {
            preview.classList.remove('selected');
        });
        
        // 为当前选择的颜色添加选中状态
        const selectedPreview = document.querySelector(`.color-preview[data-value="${selectedValue}"]`);
        if (selectedPreview) {
            selectedPreview.classList.add('selected');
        }
    },
    
    /**
     * 显示添加规则模态框
     * @param {string} groupName - 分组名称
     * @param {string} cardType - 卡片类型
     * @param {boolean} isEdit - 是否为编辑模式
     * @param {number} businessGroupIndex - 业务分组索引
     * @param {number} cardIndex - 卡片索引
     */
    showModal: function(groupName, cardType, isEdit = false, businessGroupIndex = -1, cardIndex = -1) {
        // 强制滚动到页面顶部
        window.scrollTo(0, 0);
        
        // 设置当前分组名称和卡片类型
        this.currentGroupName = groupName;
        this.currentCardType = cardType;
        this.isEditMode = isEdit;
        this.businessGroupIndex = businessGroupIndex;
        this.cardIndex = cardIndex;
        
        // 存储编辑的卡片数据（如果是编辑模式）
        if (isEdit && businessGroupIndex >= 0 && cardIndex >= 0) {
            this.editCardData = DataStore.cards[cardType][businessGroupIndex].items[cardIndex];
        } else {
            this.editCardData = null;
        }
        
        // 重新加载图标选项，确保显示最新图标文件
        this.loadIconOptions().then(() => {
            // 重置表单
            this.resetForm();
            
            // 设置模态框标题
            const modalTitle = this.modal.querySelector('.modal-title');
            
            if (this.isEditMode && this.editCardData) {
                // 编辑模式 - 加载现有卡片数据
                const cardData = this.editCardData;
                
                // 填充表单
                this.urlInput.value = cardData.url || '';
                this.titleInput.value = cardData.title || '';
                this.descriptionInput.value = cardData.description || '';
                this.cardStyleSelect.value = cardData.cardType || 'card1';
                
                // 更新卡片样式预览
                this.updateCardStylePreviewSelection(cardData.cardType || 'card1');
                
                // 选中当前图标（如果有）
                if (cardData.icon) {
                    this.selectedIconInput.value = cardData.icon;
                    
                    const iconOption = this.iconSelector.querySelector(`.icon-option[data-icon="${cardData.icon}"]`);
                    if (iconOption) {
                        this.iconOptions.forEach(opt => opt.classList.remove('selected'));
                        iconOption.classList.add('selected');
                    }
                } else {
                    // 如果没有图标，使用第一个图标作为默认值
                    const firstOption = this.iconSelector.querySelector('.icon-option');
                    if (firstOption) {
                        firstOption.classList.add('selected');
                        this.selectedIconInput.value = firstOption.getAttribute('data-icon');
                    }
                }
                
                // 更新预览
                if (cardData.iconUrl) {
                    this.previewIcon.src = cardData.iconUrl;
                    this.websitePreview.classList.add('active');
                } else {
                    this.previewIcon.src = '';
                }
                
                this.previewTitle.textContent = cardData.title || '';
                this.previewDescription.textContent = cardData.description || '';
                
                modalTitle.textContent = `编辑规则`;
                this.saveButton.textContent = '更新';
            } else {
                // 添加模式
                modalTitle.textContent = `添加${this.getCardTypeName(cardType)}规则 - ${groupName}`;
                this.saveButton.textContent = '保存';
            }
            
            // 显示模态框
            this.modal.classList.add('active');
        });
    },
    
    /**
     * 隐藏模态框
     */
    hideModal: function() {
        this.modal.classList.remove('active');
    },
    
    /**
     * 重置表单
     */
    resetForm: function() {
        this.urlInput.value = '';
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.cardStyleSelect.value = 'card1';
        
        // 初始化卡片样式预览选择
        this.updateCardStylePreviewSelection('card1');
        
        // 使用动态获取的第一个图标作为默认值
        const firstOption = this.iconSelector.querySelector('.icon-option');
        if (firstOption) {
            this.selectedIconInput.value = firstOption.getAttribute('data-icon');
        } else {
            this.selectedIconInput.value = '';
        }
        
        this.websitePreview.classList.remove('active');
        this.loadingIndicator.style.display = 'none';
        
        // 重置网站信息
        this.websiteInfo = null;
        
        // 重置图标选择
        this.iconOptions.forEach(opt => opt.classList.remove('selected'));
        if (this.iconOptions.length > 0) {
            this.iconOptions[0].classList.add('selected');
        }
    },
    
    /**
     * 获取卡片类型名称
     * @param {string} cardType - 卡片类型ID
     * @returns {string} 卡片类型名称
     */
    getCardTypeName: function(cardType) {
        const navItem = DataStore.navigation.find(item => item.id === cardType);
        return navItem ? navItem.name : cardType;
    },
    
    /**
     * 获取网站信息
     */
    fetchWebsiteInfo: function() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            alert('请输入有效的网站URL');
            return;
        }
        
        // 尝试标准化URL
        let normalizedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            normalizedUrl = 'https://' + url;
        }
        
        try {
            // 验证URL格式
            new URL(normalizedUrl);
        } catch (e) {
            alert('请输入有效的网站URL格式');
            return;
        }
        
        // 显示加载指示器
        this.loadingIndicator.style.display = 'flex';
        this.websitePreview.classList.remove('active');
        
        // 特定网站的直接处理
        let skipProxyFetch = false;
        let directInfo = null;
        
        try {
            const urlObj = new URL(normalizedUrl);
            const hostname = urlObj.hostname.toLowerCase();
            
            // B站特殊处理
            if (hostname.includes('bilibili.com')) {
                directInfo = {
                    title: 'bilibili - 你感兴趣的视频都在B站',
                    description: '哔哩哔哩(bilibili)是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。',
                    iconUrl: 'https://www.bilibili.com/favicon.ico'
                };
                skipProxyFetch = true;
            }
        } catch (error) {
            console.error('特殊网站处理出错:', error);
        }
        
        // 如果有直接信息，使用它
        if (skipProxyFetch && directInfo) {
            // 更新预览
            this.previewIcon.src = directInfo.iconUrl;
            this.previewTitle.textContent = directInfo.title;
            this.previewDescription.textContent = directInfo.description;
            
            // 填充表单
            this.titleInput.value = directInfo.title;
            this.descriptionInput.value = directInfo.description;
            
            // 存储网站信息
            this.websiteInfo = directInfo;
            
            // 显示预览
            this.websitePreview.classList.add('active');
            this.loadingIndicator.style.display = 'none';
            
            return;
        }
        
        // 使用代理服务获取网站元数据
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(normalizedUrl)}`;
        
        fetch(proxyUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
                }
                return response.json();
            })
            .then(data => {
                // 解析HTML内容
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, 'text/html');
                
                // 获取网站标题
                const title = doc.querySelector('title')?.textContent || '未找到标题';
                
                // 获取网站描述
                const description = 
                    doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                    doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || 
                    '未找到描述';
                
                // 获取网站图标
                let favicon = this.getFaviconFromDocument(doc, normalizedUrl);
                
                // 添加图标加载错误处理
                const testImageLoad = (src) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => resolve(true);
                        img.onerror = () => resolve(false);
                        img.src = src;
                        // 设置超时
                        setTimeout(() => resolve(false), 3000);
                    });
                };
                
                // 测试图标是否可以加载
                testImageLoad(favicon).then(canLoad => {
                    if (!canLoad) {
                        // 如果图标加载失败，尝试其他方式
                        console.log('图标加载失败，尝试其他方式', favicon);
                        
                        // 尝试直接使用网站域名拼接favicon路径
                        try {
                            const urlObj = new URL(normalizedUrl);
                            const directFavicon = `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
                            
                            // 测试直接favicon路径
                            testImageLoad(directFavicon).then(directCanLoad => {
                                if (directCanLoad) {
                                    favicon = directFavicon;
                                } else {
                                    // 最后使用Google的favicon服务
                                    favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(normalizedUrl)}`;
                                }
                                
                                // 更新预览图标
                                this.updatePreview(favicon, title, description);
                            });
                        } catch (e) {
                            // 出错时使用Google服务
                            favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(normalizedUrl)}`;
                            this.updatePreview(favicon, title, description);
                        }
                    } else {
                        // 图标加载成功，直接更新预览
                        this.updatePreview(favicon, title, description);
                    }
                });
                
                // 始终更新标题和描述，不管是新建还是编辑模式
                this.titleInput.value = title;
                this.descriptionInput.value = description;
            })
            .catch(error => {
                console.error('获取网站信息失败:', error);
                alert('获取网站信息失败，请检查URL是否正确或手动填写信息');
                this.loadingIndicator.style.display = 'none';
                
                // 在请求失败的情况下，尝试至少获取一个图标
                try {
                    const googleFavicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(normalizedUrl)}`;
                    this.previewIcon.src = googleFavicon;
                    this.websiteInfo = {
                        title: this.titleInput.value || normalizedUrl,
                        description: this.descriptionInput.value || '',
                        iconUrl: googleFavicon
                    };
                    
                    // 如果标题为空，尝试使用网站域名作为标题
                    if (!this.titleInput.value) {
                        try {
                            const urlObj = new URL(normalizedUrl);
                            this.titleInput.value = urlObj.hostname;
                        } catch (e) {
                            this.titleInput.value = normalizedUrl;
                        }
                    }
                } catch (e) {
                    console.error('获取Google图标服务失败:', e);
                }
            });
    },
    
    /**
     * 更新预览
     */
    updatePreview: function(favicon, title, description) {
        // 更新预览图标
        this.previewIcon.src = favicon;
        this.previewTitle.textContent = title;
        this.previewDescription.textContent = description;
        
        // 存储网站信息，供保存时使用
        this.websiteInfo = {
            title: title,
            description: description,
            iconUrl: favicon
        };
        
        // 显示预览
        this.websitePreview.classList.add('active');
        this.loadingIndicator.style.display = 'none';
    },
    
    /**
     * 从文档中获取favicon
     * @param {Document} doc - 解析后的HTML文档
     * @param {string} url - 网站URL
     * @returns {string} favicon URL
     */
    getFaviconFromDocument: function(doc, url) {
        // 特殊网站处理
        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();
            
            // B站特殊处理
            if (hostname.includes('bilibili.com')) {
                return 'https://www.bilibili.com/favicon.ico';
            }
        } catch (error) {
            console.error('特殊网站处理出错:', error);
        }
        
        // 尝试获取各种可能的图标
        const iconLinks = [
            doc.querySelector('link[rel="icon"]'),
            doc.querySelector('link[rel="shortcut icon"]'),
            doc.querySelector('link[rel="apple-touch-icon"]'),
            doc.querySelector('link[rel="apple-touch-icon-precomposed"]'),
            doc.querySelector('link[rel="fluid-icon"]'),
            doc.querySelector('meta[property="og:image"]'),
            doc.querySelector('meta[name="msapplication-TileImage"]')
        ];
        
        // 过滤掉不存在的元素并获取href或content属性
        const icons = iconLinks
            .filter(link => link !== null)
            .map(link => {
                if (link.tagName.toLowerCase() === 'meta') {
                    return link.getAttribute('content');
                } else {
                    return link.getAttribute('href');
                }
            })
            .filter(href => href && href.trim() !== '');
        
        if (icons.length > 0) {
            // 处理相对URL
            try {
                const iconUrl = icons[0];
                if (iconUrl.startsWith('http')) {
                    return iconUrl;
                } else if (iconUrl.startsWith('//')) {
                    // 处理协议相对URL
                    const urlObj = new URL(url);
                    return `${urlObj.protocol}${iconUrl}`;
                } else {
                    const urlObj = new URL(url);
                    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
                    return iconUrl.startsWith('/') ? baseUrl + iconUrl : baseUrl + '/' + iconUrl;
                }
            } catch (error) {
                console.error('处理图标URL时出错:', error);
            }
        }
        
        // 如果无法从HTML中获取，尝试常见的favicon路径
        try {
            const urlObj = new URL(url);
            const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
            
            // 常见的图标路径列表
            const commonPaths = [
                '/favicon.ico',
                '/favicon.png',
                '/apple-touch-icon.png',
                '/apple-touch-icon-precomposed.png',
                '/apple-touch-icon-120x120.png',
                '/assets/favicon.ico',
                '/images/favicon.ico',
                '/static/favicon.ico'
            ];
            
            // 返回第一个可能的路径
            return baseUrl + commonPaths[0];
        } catch (error) {
            console.error('创建默认favicon路径时出错:', error);
            // 如果所有尝试都失败，使用Google提供的favicon服务
            return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}`;
        }
    },
    
    /**
     * 保存规则
     */
    saveRule: function() {
        // 获取表单数据
        const url = this.urlInput.value.trim();
        const title = this.titleInput.value.trim();
        const description = this.descriptionInput.value.trim();
        const icon = this.selectedIconInput.value;
        const cardType = this.cardStyleSelect.value;
        
        // 验证
        if (!url || !title) {
            alert('请填写网址和标题');
            return;
        }
        
        // 创建卡片数据对象
        const cardData = {
            url: url,
            title: title,
            description: description,
            icon: icon,
            cardType: cardType
        };
        
        // 如果有网站图标，添加到卡片数据
        if (this.websiteInfo && this.websiteInfo.iconUrl) {
            cardData.iconUrl = this.websiteInfo.iconUrl;
        } else if (this.isEditMode && this.editCardData && this.editCardData.iconUrl) {
            // 保留原有图标
            cardData.iconUrl = this.editCardData.iconUrl;
        } else {
            // 如果没有图标，尝试使用Google的favicon服务
            try {
                cardData.iconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}`;
            } catch (error) {
                console.error('获取Google图标服务失败:', error);
                // 保持使用选择的本地图标
            }
        }
        
        if (this.isEditMode && this.businessGroupIndex >= 0 && this.cardIndex >= 0) {
            // 编辑模式 - 更新现有卡片
            DataStore.cards[this.currentCardType][this.businessGroupIndex].items[this.cardIndex] = cardData;
            alert('规则已成功更新！');
        } else {
            // 添加模式 - 添加新卡片
            // 查找现有分组
            const cardTypeData = DataStore.cards[this.currentCardType];
            const groupIndex = cardTypeData.findIndex(group => group.groupName === this.currentGroupName);
            
            if (groupIndex !== -1) {
                // 向现有分组添加卡片
                cardTypeData[groupIndex].items.push(cardData);
            } else {
                // 创建新分组并添加卡片
                cardTypeData.push({
                    groupName: this.currentGroupName,
                    items: [cardData]
                });
            }
            
            alert('规则已成功添加！');
        }
        
        // 保存到本地存储
        this.saveToLocalStorage();
        
        // 隐藏模态框
        this.hideModal();
        
        // 触发UI更新
        this.triggerUIUpdate();
    },
    
    /**
     * 保存到本地存储
     */
    saveToLocalStorage: function() {
        localStorage.setItem('ruleSystemData', JSON.stringify(DataStore));
    },
    
    /**
     * 从本地存储加载数据
     */
    loadFromLocalStorage: function() {
        const savedData = localStorage.getItem('ruleSystemData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            
            // 更新导航数据
            if (parsedData.navigation) {
                DataStore.navigation = parsedData.navigation;
            }
            
            // 更新卡片数据
            if (parsedData.cards) {
                DataStore.cards = parsedData.cards;
            }
            
            return true;
        }
        return false;
    },
    
    /**
     * 触发UI更新
     */
    triggerUIUpdate: function() {
        // 创建并分发自定义事件
        const event = new CustomEvent('dataUpdated');
        document.dispatchEvent(event);
    }
};

export default ModalHandler; 