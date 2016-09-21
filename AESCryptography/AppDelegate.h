//
//  AppDelegate.h
//  AESCryptography
//
//  Created by Mayur Birari on 22/11/12.
//  Copyright (c) 2012 Extentia Information Technology. All rights reserved.
//

#define SCREEN_WIDTH ([[UIScreen mainScreen] bounds].size.width)
#define SCREEN_HEIGHT ([[UIScreen mainScreen] bounds].size.height)

#define IS_IPHONE_4 480.0
#define IS_IPHONE_5 568.0
#define IS_IPHONE_6 667.0
#define IS_IPHONE_6P 736.0


#import <UIKit/UIKit.h>

@class ViewController;

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;

@property (strong, nonatomic) ViewController *viewController;

@property(nonatomic) BOOL shouldRotate;


@end
