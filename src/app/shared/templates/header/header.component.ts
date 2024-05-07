import { Component, Inject, OnInit, inject } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { RolService } from '../../services/roles.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountsService } from '../../services/accounts.service';
import { Subject, map, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
    
})

export class HeaderComponent implements OnInit {

    user: any;
    userRol:string = "";
    SegmentName: string = "";
    infoLoad:any = [];
    infoSegment: any ;
    stopSubscription$: Subject<boolean> = new Subject();
    rolService = inject(RolService);
    authService = inject(AuthenticationService);
    themeService= inject(ThemeConstantService);
    accountsService = inject(AccountsService);
    constructor(      
    ) {
        this.authService.user.subscribe( (user:any) => {
            this.user = user;              
            if(this.user != null){
                if (this.user !== null && this.user !== undefined && this.user.idSegment !== undefined) { 
                this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {                    
                    this.infoLoad = item;
                    this.userRol = this.infoLoad.description;
                   });
                    this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
                      takeUntil(this.stopSubscription$),
                      map((a:any) => {
                        const id = a.payload.id;
                        const data = a.payload.data() as any;
                        return { id, ...data }
                      }),
                      tap(record => {             
                        this.infoSegment = record;    
                        this.SegmentName = this.infoSegment.nivel;        
                        return record;
                      })
                    ).subscribe();                   
                }
            }
        });
    }

    searchVisible = false;
    quickViewVisible = false;
    isFolded!: boolean;
    isExpand!: boolean;

    notificationList = [
        {
            title: 'You received a new message',
            time: '8 min',
            icon: 'mail',
            color: 'ant-avatar-' + 'blue'
        },
        {
            title: 'New user registered',
            time: '7 hours',
            icon: 'user-add',
            color: 'ant-avatar-' + 'cyan'
        },
        {
            title: 'System Alert',
            time: '8 hours',
            icon: 'warning',
            color: 'ant-avatar-' + 'red'
        },
        {
            title: 'You have a new update',
            time: '2 days',
            icon: 'sync',
            color: 'ant-avatar-' + 'gold'
        }
    ];

    ngOnInit(): void {
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    }

    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }
}
