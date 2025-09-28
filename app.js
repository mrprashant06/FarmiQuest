// Mobile AgriQuest App - JavaScript (Navigation Fixed)
class MobileAgriQuestApp {
    constructor() {
        this.currentScreen = 'splash-screen';
        this.onboardingStep = 1;
        this.userData = {
            name: '',
            phone: '',
            experience: '',
            crops: [],
            farmSize: '',
            location: '',
            farmingType: '',
            goals: [],
            level: 1,
            xp: 1250,
            badges: 5,
            completedMissions: 12
        };
        this.missions = this.initializeMissions();
        this.currentMission = null;
        this.initialized = false;
    }

    init() {
        console.log('🌱 Initializing Mobile AgriQuest App...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.completeInit());
        } else {
            this.completeInit();
        }
    }

    completeInit() {
        console.log('🔧 Completing initialization...');
        
        // Setup event listeners first
        this.setupEventListeners();
        this.setupTouchGestures();
        
        // Bind global functions
        this.bindGlobalFunctions();
        
        // Start with splash screen and set auto-transition
        this.showScreen('splash-screen');
        setTimeout(() => {
            console.log('⏰ Auto-transitioning from splash to welcome');
            this.showScreen('welcome-screen');
        }, 2000);
        
        this.updateGreeting();
        this.generateAIRecommendations();
        
        this.initialized = true;
        console.log('✅ Mobile AgriQuest App ready!');
    }

    bindGlobalFunctions() {
        // Ensure all global functions are properly bound
        window.startOnboarding = () => this.startOnboarding();
        window.showLogin = () => this.showLogin();
        window.nextStep = () => this.nextStep();
        window.prevStep = () => this.prevStep();
        window.showDashboard = () => this.showScreen('dashboard-screen');
        window.showMissions = () => this.showScreen('missions-screen');
        window.showCommunity = () => this.showScreen('community-screen');
        window.showProfile = () => this.showScreen('profile-screen');
        window.showMissionDetail = (missionId) => this.showMissionDetail(missionId);
        window.openCamera = () => this.openCamera();
        window.simulatePhotoTaken = () => this.simulatePhotoTaken();
        window.markStepComplete = () => this.markStepComplete();
        window.closeCamera = () => this.closeCamera();
        window.closeSuccessModal = () => this.closeSuccessModal();
        window.showNotifications = () => this.showNotifications();
        window.createPost = () => this.createPost();
        window.showWeatherDetails = () => this.showWeatherDetails();
        window.showMarketPrices = () => this.showMarketPrices();
        window.getAITips = () => this.getAITips();
        window.askAI = () => this.askAI();
        window.toggleMissionFilters = () => this.toggleMissionFilters();
        window.showSettings = () => this.showInfo('Settings', 'App settings and preferences would be configured here');
        window.showHelp = () => this.showHelp();
        
        console.log('🔗 Global functions bound');
    }

    startOnboarding() {
        console.log('🚀 Starting onboarding flow');
        this.onboardingStep = 1;
        this.showScreen('onboarding-screen');
        setTimeout(() => {
            this.showOnboardingStep();
        }, 100);
    }

    showLogin() {
        console.log('🔑 Simulating login');
        // Simulate quick login with demo data
        this.userData.name = 'Demo Farmer';
        this.userData.location = 'Punjab, India';
        this.userData.crops = ['rice', 'wheat'];
        this.userData.farmSize = 'medium';
        this.userData.experience = 'intermediate';
        this.userData.farmingType = 'mixed';
        this.userData.goals = ['increase-yield', 'sustainable-farming'];
        
        this.showScreen('dashboard-screen');
        
        setTimeout(() => {
            this.showSuccess(
                'Welcome Back! 👋',
                `Hello ${this.userData.name}! Ready to continue your farming journey?`,
                '+50 XP'
            );
        }, 800);
    }

    // Screen Navigation - Completely rewritten for reliability
    showScreen(screenId) {
        console.log(`📱 Switching to screen: ${screenId}`);
        
        // Get all screen elements
        const allScreens = document.querySelectorAll('.screen');
        const targetScreen = document.getElementById(screenId);
        
        if (!targetScreen) {
            console.error(`❌ Screen not found: ${screenId}`);
            return;
        }
        
        // Hide all screens immediately
        allScreens.forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });
        
        // Show target screen
        targetScreen.style.display = 'block';
        targetScreen.classList.add('active');
        
        // Update current screen
        this.currentScreen = screenId;
        
        // Update navigation
        this.updateBottomNav(screenId);
        
        // Handle screen-specific updates
        setTimeout(() => {
            this.handleScreenChange(screenId);
        }, 50);
        
        console.log(`✅ Now showing: ${screenId}`);
    }

    updateBottomNav(screenId) {
        const navMap = {
            'dashboard-screen': 0,
            'missions-screen': 1,
            'community-screen': 2,
            'profile-screen': 3
        };
        
        const activeIndex = navMap[screenId];
        if (activeIndex !== undefined) {
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to current nav item
            const navItems = document.querySelectorAll('.nav-item');
            if (navItems[activeIndex]) {
                navItems[activeIndex].classList.add('active');
            }
        }
    }

    handleScreenChange(screenId) {
        switch (screenId) {
            case 'dashboard-screen':
                this.updateDashboard();
                break;
            case 'missions-screen':
                this.updateMissions();
                break;
            case 'profile-screen':
                this.updateProfile();
                break;
            case 'community-screen':
                // Community screen updates
                break;
        }
    }

    setupEventListeners() {
        console.log('🎯 Setting up event listeners...');
        
        // Bottom navigation with proper event handling
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            // Remove any existing listeners
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            // Add fresh listener
            newItem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🔘 Nav item ${index} clicked`);
                
                switch (index) {
                    case 0:
                        this.showScreen('dashboard-screen');
                        break;
                    case 1:
                        this.showScreen('missions-screen');
                        break;
                    case 2:
                        this.showScreen('community-screen');
                        break;
                    case 3:
                        this.showScreen('profile-screen');
                        break;
                }
            });
        });

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentScreen === 'mission-detail-screen') {
                    this.showScreen('missions-screen');
                } else {
                    this.showScreen('dashboard-screen');
                }
            });
        });

        // Form and interaction listeners
        this.setupFormListeners();
        this.setupSelectionListeners();
        this.setupMissionListeners();
        this.setupCommunityListeners();
        this.setupProfileListeners();
        this.setupModalListeners();
        
        console.log('✅ Event listeners ready');
    }

    setupFormListeners() {
        const inputs = ['farmer-name', 'farmer-phone', 'experience-level', 'farm-size', 'farm-location', 'farming-type'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.validateCurrentStep());
                element.addEventListener('change', () => this.validateCurrentStep());
            }
        });
    }

    setupSelectionListeners() {
        // Crop selection
        document.querySelectorAll('.crop-card').forEach(card => {
            card.addEventListener('click', () => {
                const crop = card.dataset.crop;
                if (this.userData.crops.includes(crop)) {
                    this.userData.crops = this.userData.crops.filter(c => c !== crop);
                    card.classList.remove('selected');
                } else {
                    this.userData.crops.push(crop);
                    card.classList.add('selected');
                }
                this.validateCurrentStep();
                console.log('Crops selected:', this.userData.crops);
            });
        });

        // Goal selection
        document.querySelectorAll('.goal-card').forEach(card => {
            card.addEventListener('click', () => {
                const goal = card.dataset.goal;
                if (this.userData.goals.includes(goal)) {
                    this.userData.goals = this.userData.goals.filter(g => g !== goal);
                    card.classList.remove('selected');
                } else {
                    this.userData.goals.push(goal);
                    card.classList.add('selected');
                }
                this.validateCurrentStep();
                console.log('Goals selected:', this.userData.goals);
            });
        });
    }

    setupMissionListeners() {
        // Mission interactions using event delegation
        document.addEventListener('click', (e) => {
            const missionElement = e.target.closest('.mission-card, .mission-item');
            if (missionElement) {
                e.preventDefault();
                const missionId = this.extractMissionIdFromElement(missionElement);
                if (missionId) {
                    console.log('🎯 Mission clicked:', missionId);
                    this.showMissionDetail(missionId);
                }
            }
        });

        // Filter functionality
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.filterMissions(tab.dataset.filter);
            });
        });
    }

    extractMissionIdFromElement(element) {
        if (element.dataset.missionId) return element.dataset.missionId;
        
        // Map text content to mission IDs
        const text = element.textContent.toLowerCase();
        if (text.includes('water') || text.includes('conservation')) return 'water-conservation';
        if (text.includes('pest') || text.includes('organic')) return 'pest-management';
        if (text.includes('cover') || text.includes('champion')) return 'cover-crops';
        if (text.includes('soil') || text.includes('health')) return 'soil-testing';
        
        return 'water-conservation'; // Default
    }

    setupCommunityListeners() {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const tab = button.dataset.tab;
                this.showCommunityTab(tab);
            });
        });

        document.querySelectorAll('.post-actions .action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handlePostAction(btn);
            });
        });
    }

    setupProfileListeners() {
        document.querySelectorAll('.action-item').forEach(item => {
            item.addEventListener('click', () => {
                const text = item.textContent.toLowerCase();
                if (text.includes('edit')) this.editProfile();
                else if (text.includes('help')) this.showHelp();
                else if (text.includes('share')) this.shareApp();
                else if (text.includes('logout')) this.logout();
            });
        });
    }

    setupModalListeners() {
        // Modal close functionality
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal(btn.closest('.modal'));
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    setupTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            // Handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.handleSwipeLeft();
                } else {
                    this.handleSwipeRight();
                }
            }

            touchStartX = 0;
            touchStartY = 0;
        }, { passive: true });
    }

    handleSwipeLeft() {
        if (this.currentScreen === 'dashboard-screen') {
            this.showScreen('missions-screen');
        } else if (this.currentScreen === 'missions-screen') {
            this.showScreen('community-screen');
        }
    }

    handleSwipeRight() {
        if (this.currentScreen === 'mission-detail-screen') {
            this.showScreen('missions-screen');
        } else if (this.currentScreen === 'community-screen') {
            this.showScreen('missions-screen');
        } else if (this.currentScreen === 'missions-screen') {
            this.showScreen('dashboard-screen');
        }
    }

    // Rest of the methods remain the same as before...
    initializeMissions() {
        return {
            'water-conservation': {
                id: 'water-conservation',
                title: 'Water Conservation Challenge',
                description: 'Reduce your farm\'s water usage by 20% this week through efficient irrigation practices.',
                difficulty: 'easy',
                category: 'Sustainable',
                reward: '+300 XP',
                progress: 60,
                icon: '💧',
                steps: [
                    { id: 1, title: 'Install drip irrigation', description: 'Set up efficient drip irrigation', completed: true },
                    { id: 2, title: 'Monitor soil moisture', description: 'Check soil moisture daily', completed: true },
                    { id: 3, title: 'Water during optimal hours', description: 'Water crops 5-7 AM', completed: true },
                    { id: 4, title: 'Document water usage', description: 'Record daily consumption', completed: false },
                    { id: 5, title: 'Analyze and optimize', description: 'Review and optimize usage', completed: false }
                ]
            },
            'pest-management': {
                id: 'pest-management',
                title: 'Organic Pest Control',
                description: 'Master natural pest management techniques to protect crops without harmful chemicals.',
                difficulty: 'medium',
                category: 'Management',
                reward: 'Pest Master Badge',
                progress: 30,
                icon: '🛡️',
                steps: [
                    { id: 1, title: 'Identify pest problems', description: 'Survey crops for pest issues', completed: true },
                    { id: 2, title: 'Research organic solutions', description: 'Learn natural pest control', completed: false },
                    { id: 3, title: 'Prepare treatments', description: 'Make organic pesticides', completed: false },
                    { id: 4, title: 'Apply treatments', description: 'Use organic pest control', completed: false },
                    { id: 5, title: 'Monitor results', description: 'Track effectiveness', completed: false }
                ]
            }
        };
    }

    // Onboarding methods
    nextStep() {
        console.log(`⏭️ Next step from ${this.onboardingStep}`);
        
        if (!this.validateCurrentStep()) {
            this.showError('Please complete all required fields');
            return;
        }
        
        this.collectCurrentStepData();
        
        if (this.onboardingStep < 4) {
            this.onboardingStep++;
            this.showOnboardingStep();
        } else {
            this.completeOnboarding();
        }
    }

    prevStep() {
        if (this.onboardingStep > 1) {
            this.onboardingStep--;
            this.showOnboardingStep();
        }
    }

    showOnboardingStep() {
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const currentStep = document.querySelector(`.onboarding-step[data-step="${this.onboardingStep}"]`);
        if (currentStep) {
            currentStep.classList.add('active');
        }
        
        this.updateOnboardingProgress();
        this.updateOnboardingButtons();
    }

    updateOnboardingProgress() {
        const progress = (this.onboardingStep / 4) * 100;
        const progressBar = document.getElementById('onboarding-progress');
        const stepIndicator = document.getElementById('current-step');
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (stepIndicator) stepIndicator.textContent = this.onboardingStep;
    }

    updateOnboardingButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.onboardingStep === 1;
            prevBtn.style.opacity = this.onboardingStep === 1 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.textContent = this.onboardingStep === 4 ? 'Complete Setup' : 'Next';
        }
    }

    validateCurrentStep() {
        switch (this.onboardingStep) {
            case 1:
                const name = document.getElementById('farmer-name')?.value.trim();
                const phone = document.getElementById('farmer-phone')?.value.trim();
                const experience = document.getElementById('experience-level')?.value;
                return name && phone && experience;
            case 2:
                return this.userData.crops.length > 0;
            case 3:
                const farmSize = document.getElementById('farm-size')?.value;
                const location = document.getElementById('farm-location')?.value.trim();
                const farmingType = document.getElementById('farming-type')?.value;
                return farmSize && location && farmingType;
            case 4:
                return this.userData.goals.length > 0;
            default:
                return true;
        }
    }

    collectCurrentStepData() {
        switch (this.onboardingStep) {
            case 1:
                this.userData.name = document.getElementById('farmer-name')?.value.trim() || '';
                this.userData.phone = document.getElementById('farmer-phone')?.value.trim() || '';
                this.userData.experience = document.getElementById('experience-level')?.value || '';
                break;
            case 3:
                this.userData.farmSize = document.getElementById('farm-size')?.value || '';
                this.userData.location = document.getElementById('farm-location')?.value.trim() || '';
                this.userData.farmingType = document.getElementById('farming-type')?.value || '';
                break;
        }
    }

    completeOnboarding() {
        console.log('✅ Onboarding completed:', this.userData);
        this.showScreen('dashboard-screen');
        
        setTimeout(() => {
            this.showSuccess(
                'Welcome to AgriQuest! 🎉',
                `Hi ${this.userData.name}! Ready to start your farming adventure?`,
                '+100 XP'
            );
        }, 600);
    }

    // Dashboard methods
    updateDashboard() {
        this.updateGreeting();
        this.updateUserStats();
        this.updateAIRecommendations();
    }

    updateGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Good Morning! 🌅';
        if (hour >= 12 && hour < 17) greeting = 'Good Afternoon! ☀️';
        else if (hour >= 17 && hour < 21) greeting = 'Good Evening! 🌆';
        else if (hour >= 21 || hour < 5) greeting = 'Working Late! 🌙';
        
        const greetingEl = document.getElementById('greeting-text');
        const userNameEl = document.getElementById('user-name');
        
        if (greetingEl) greetingEl.textContent = greeting;
        if (userNameEl) userNameEl.textContent = this.userData.name || 'Farmer';
    }

    updateUserStats() {
        const updates = {
            'user-level': this.userData.level,
            'user-xp': this.userData.xp.toLocaleString(),
            'active-missions': 2,
            'total-badges': this.userData.badges,
            'completion-rate': '87%',
            'location-name': this.userData.location || 'Your Farm'
        };
        
        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        this.updateLevelProgress();
    }

    updateLevelProgress() {
        const currentLevelXP = (this.userData.level - 1) * 1000;
        const nextLevelXP = this.userData.level * 1000;
        const progress = ((this.userData.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
        
        const progressBar = document.getElementById('level-progress');
        if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    }

    updateAIRecommendations() {
        const tips = [
            'Perfect weather for irrigation. Consider watering in the evening.',
            'High humidity detected. Monitor crops for fungal diseases.',
            'Sunny days ahead! Great time for pest monitoring.',
            'Rain expected tomorrow. Delay fertilizer application.',
            'Temperature rising. Ensure adequate shade for sensitive crops.'
        ];
        
        const aiEl = document.getElementById('ai-recommendation');
        if (aiEl) {
            aiEl.textContent = tips[Math.floor(Math.random() * tips.length)];
        }
    }

    generateAIRecommendations() {
        // Called during init
        this.updateAIRecommendations();
    }

    // Mission methods
    showMissionDetail(missionId) {
        console.log(`🎯 Opening mission: ${missionId}`);
        const mission = this.missions[missionId];
        if (!mission) {
            console.error('Mission not found:', missionId);
            return;
        }
        
        this.currentMission = missionId;
        this.showScreen('mission-detail-screen');
        this.populateMissionDetail(mission);
    }

    populateMissionDetail(mission) {
        // Update mission details
        const updates = {
            'detail-mission-icon': mission.icon,
            'detail-mission-title': mission.title,
            'detail-category': mission.category,
            'detail-description': mission.description
        };
        
        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });

        // Update difficulty badge
        const difficultyEl = document.getElementById('detail-difficulty');
        if (difficultyEl) {
            difficultyEl.textContent = mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1);
            difficultyEl.className = `difficulty ${mission.difficulty}`;
        }
        
        // Update progress
        this.updateProgressCircle(mission.progress);
        
        const completedSteps = mission.steps.filter(s => s.completed).length;
        const updates2 = {
            'completed-steps': completedSteps,
            'total-steps': mission.steps.length,
            'progress-value': `${mission.progress}%`
        };
        
        Object.entries(updates2).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        this.updateMissionSteps(mission.steps);
        this.updateAITips(mission);
    }

    updateProgressCircle(progress) {
        const circle = document.getElementById('progress-ring');
        if (circle) {
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (progress / 100) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        }
    }

    updateMissionSteps(steps) {
        const container = document.getElementById('steps-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        steps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = `step-item ${step.completed ? 'completed' : ''}`;
            
            stepEl.innerHTML = `
                <div class="step-number">${step.completed ? '✓' : index + 1}</div>
                <div class="step-content">
                    <h5>${step.title}</h5>
                    <p>${step.description}</p>
                </div>
            `;
            
            container.appendChild(stepEl);
        });
    }

    updateAITips(mission) {
        const tips = {
            'water-conservation': 'Install drip irrigation for 30% water savings. Check soil moisture 2 inches down before watering.',
            'pest-management': 'Neem oil mixed with soap water works against aphids. Apply in early morning or evening.',
        };
        
        const aiTipsEl = document.getElementById('ai-tips');
        if (aiTipsEl) {
            aiTipsEl.textContent = tips[mission.id] || 'Keep up the great work! Consistent effort leads to success.';
        }
    }

    markStepComplete() {
        if (!this.currentMission) return;
        
        const mission = this.missions[this.currentMission];
        const nextStep = mission.steps.find(s => !s.completed);
        
        if (nextStep) {
            nextStep.completed = true;
            
            const completedSteps = mission.steps.filter(s => s.completed).length;
            mission.progress = Math.round((completedSteps / mission.steps.length) * 100);
            
            const xpGain = 50;
            this.userData.xp += xpGain;
            
            this.showSuccess(
                'Step Completed! 🎉',
                `Great job: ${nextStep.title}`,
                `+${xpGain} XP`
            );
            
            setTimeout(() => {
                this.populateMissionDetail(mission);
            }, 2000);
        } else {
            this.showInfo('Complete!', 'All steps are already completed!');
        }
    }

    // Community methods
    showCommunityTab(tabName) {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
        console.log(`👥 Community tab: ${tabName}`);
    }

    handlePostAction(button) {
        const action = button.textContent.toLowerCase();
        if (action.includes('like')) {
            button.style.color = 'var(--color-primary)';
            const count = parseInt(button.textContent.match(/\d+/)?.[0] || '0');
            button.innerHTML = button.innerHTML.replace(/\d+/, count + 1);
        }
        this.simulateHapticFeedback();
    }

    createPost() {
        const content = prompt('💬 Share with the community:');
        if (content && content.trim()) {
            this.showSuccess('Posted! 📝', 'Your post has been shared!', '+10 XP');
            this.userData.xp += 10;
        }
    }

    // Profile methods
    updateProfile() {
        const updates = {
            'profile-name': this.userData.name || 'Farmer',
            'profile-location': this.userData.location || 'Farm Location',
            'profile-level-num': this.userData.level,
            'profile-xp': this.userData.xp.toLocaleString(),
            'crop-type': this.formatCrops(this.userData.crops),
            'farm-size-display': this.formatFarmSize(this.userData.farmSize),
            'completed-missions': this.userData.completedMissions,
            'success-rate': '87%'
        };
        
        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    formatCrops(crops) {
        if (!crops || crops.length === 0) return 'Mixed Crops';
        return crops.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
    }

    formatFarmSize(size) {
        const sizeMap = {
            'small': 'Small (< 2 acres)',
            'medium': 'Medium (2-10 acres)',
            'large': 'Large (10+ acres)'
        };
        return sizeMap[size] || 'Not specified';
    }

    editProfile() {
        this.showInfo('Edit Profile', 'Profile editing would open here');
    }

    shareApp() {
        if (navigator.share) {
            navigator.share({
                title: 'AgriQuest - Gamified Farming',
                text: 'Join me on AgriQuest!',
                url: window.location.href
            });
        } else {
            this.showInfo('Share AgriQuest', 'Tell other farmers about AgriQuest!');
        }
    }

    logout() {
        if (confirm('🚪 Logout?')) {
            this.showScreen('welcome-screen');
            this.userData = { name: '', crops: [], goals: [], level: 1, xp: 0, badges: 0, completedMissions: 0 };
        }
    }

    // Utility methods
    updateMissions() {
        console.log('🎯 Missions view updated');
    }

    openCamera() {
        this.showModal('camera-modal');
    }

    simulatePhotoTaken() {
        this.closeModal(document.getElementById('camera-modal'));
        setTimeout(() => {
            this.showSuccess('Photo Taken! 📸', 'Progress photo saved', '+25 XP');
            this.userData.xp += 25;
        }, 500);
    }

    showNotifications() {
        const notifications = [
            '🌧️ Rain tomorrow - plan accordingly',
            '📈 Rice prices up 5%',
            '👥 New farmers in your area'
        ];
        alert('🔔 Notifications:\n\n' + notifications.join('\n\n'));
    }

    showWeatherDetails() {
        this.showInfo('Weather', '7-day forecast would be shown here');
    }

    showMarketPrices() {
        this.showInfo('Market Prices', 'Current crop prices would be displayed here');
    }

    getAITips() {
        const tips = [
            'Water early morning to reduce evaporation',
            'Check soil moisture before watering',
            'Use mulch to retain soil moisture',
            'Group plants by water needs'
        ];
        this.showInfo('AI Tips 🤖', tips[Math.floor(Math.random() * tips.length)]);
    }

    askAI() {
        const question = prompt('🤖 Ask AI about farming:');
        if (question && question.trim()) {
            setTimeout(() => {
                this.showInfo('AI Response 🤖', 'Based on your question, I recommend checking soil conditions daily and using organic methods when possible.');
            }, 1000);
        }
    }

    showHelp() {
        this.showInfo('Help & Support', 'Tutorials, FAQs, and support contact would be available here');
    }

    toggleMissionFilters() {
        const filters = document.getElementById('mission-filters');
        if (filters) filters.classList.toggle('hidden');
    }

    filterMissions(filter) {
        console.log(`🔍 Filtering by: ${filter}`);
    }

    // Modal methods
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    showSuccess(title, message, reward = null) {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.querySelector('h3').textContent = title;
            modal.querySelector('p').textContent = message;
            
            const rewardEl = modal.querySelector('#reward-amount');
            const rewardDisplay = modal.querySelector('.reward-display');
            
            if (reward && rewardEl && rewardDisplay) {
                rewardEl.textContent = reward;
                rewardDisplay.style.display = 'flex';
            } else if (rewardDisplay) {
                rewardDisplay.style.display = 'none';
            }
            
            this.showModal('success-modal');
            this.simulateHapticFeedback();
        }
    }

    showError(message) {
        alert('⚠️ ' + message);
    }

    showInfo(title, message) {
        alert(`ℹ️ ${title}\n\n${message}`);
    }

    closeSuccessModal() {
        this.closeModal(document.getElementById('success-modal'));
    }

    closeCamera() {
        this.closeModal(document.getElementById('camera-modal'));
    }

    simulateHapticFeedback() {
        document.body.style.transform = 'scale(0.995)';
        setTimeout(() => document.body.style.transform = 'scale(1)', 50);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting Mobile AgriQuest...');
    window.app = new MobileAgriQuestApp();
    window.app.init();
});

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.app) {
            window.app.handleScreenChange(window.app.currentScreen);
        }
    }, 100);
});