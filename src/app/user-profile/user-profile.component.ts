import { Component, OnInit, OnDestroy } from '@angular/core';

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    provider: string;
}

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
    user: User | null = null;
    cartItemCount: number = 0;
    private cartListener: any;

    ngOnInit() {
        this.loadUser();

        // Listen for cart updates with validation
        this.cartListener = (event: any) => {
            const data = event.detail;

            // ✅ Validate cart update data
            if (data && typeof data.itemCount === 'number' && data.itemCount >= 0) {
                this.cartItemCount = data.itemCount;
            } else {
                console.error('❌ Invalid cart update data received:', data);
            }
        };
        window.addEventListener('cartUpdated', this.cartListener);
    }

    ngOnDestroy() {
        window.removeEventListener('cartUpdated', this.cartListener);
    }

    loadUser() {
        // Get user from session storage (set by auth service)
        const stored = sessionStorage.getItem('mfe_user');
        if (stored) {
            this.user = JSON.parse(stored);
            console.log('✅ User loaded:', this.user);
        } else {
            console.log('⚠️ No user found in session storage');
        }
    }

    getProviderDisplay(): string {
        if (!this.user) return '';
        return this.user.provider === 'google' ? '🔵 Google Account' : '🟢 Demo Account';
    }
}