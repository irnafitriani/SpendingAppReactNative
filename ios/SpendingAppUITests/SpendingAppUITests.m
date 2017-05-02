//
//  SpendingAppUITests.m
//  SpendingAppUITests
//
//  Created by MTMAC21 on 4/26/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>

@interface SpendingAppUITests : XCTestCase

@end

@implementation SpendingAppUITests

- (void)setUp {
    [super setUp];
    
    // Put setup code here. This method is called before the invocation of each test method in the class.
    
    // In UI tests it is usually best to stop immediately when a failure occurs.
    self.continueAfterFailure = NO;
    // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
    [[[XCUIApplication alloc] init] launch];
    
    // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample {
    // Use recording to get started writing UI tests.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
}

//-(void)testRegister{
//  
//  XCUIApplication *app = [[XCUIApplication alloc] init];
//  [[app.otherElements[@"     Email   Password   Sign In   Do not have an account, Sign Up!   Forgot Password?  Progress halted "] childrenMatchingType:XCUIElementTypeImage].element tap];
//  [[app.otherElements[@"     Name   Email   Password   Confirm Password   Sign Up  Progress halted   Already has an account, Sign In "] childrenMatchingType:XCUIElementTypeImage].element tap];
//  [app typeText:@"test2"];
//  [[app.otherElements[@"       Email   Password   Confirm Password   Sign Up  Progress halted   Already has an account, Sign In "] childrenMatchingType:XCUIElementTypeImage].element tap];
//  [app typeText:@"test2@test.com"];
//  [[app.otherElements[@"     Test2   Test2@test.com     Confirm Password   Sign Up  Progress halted   Already has an account, Sign In "] childrenMatchingType:XCUIElementTypeImage].element tap];
//  [app typeText:@"123456"];
//  
//}
//
//-(void)testLogin{
//  
//  XCUIApplication *app2 = [[XCUIApplication alloc] init];
//  XCUIElement *image2 = [app2.otherElements[@"     Test1@test.com   Password   Sign In   Do not have an account, Sign Up!   Forgot Password?  Progress halted "] childrenMatchingType:XCUIElementTypeImage].element;
//  [image2 tap];
//  [app2 typeText:@"12345678"];[[app2.otherElements[@"     Test1@test.com     Sign In   Do not have an account, Sign Up!   Forgot Password?  Progress halted "] childrenMatchingType:XCUIElementTypeImage].element tap];
//  
//  
//  
//}
//
//-(void)testForgotPassword{
//  
//  XCUIApplication *app = [[XCUIApplication alloc] init];
//  [[app.otherElements[@"     Email   Password   Sign In   Do not have an account, Sign Up!   Forgot Password?  Progress halted "] childrenMatchingType:XCUIElementTypeImage].element tap];
//
//  [app typeText:@"test1@test.com"];
//  [[app.otherElements[@"       Reset Password  Progress halted   Back to Sign In "] childrenMatchingType:XCUIElementTypeImage].element tap];
//  
//  
//}


@end
