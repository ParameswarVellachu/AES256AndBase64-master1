//
//  ViewController.m
//  AESCryptography
//
//  Created by Mayur Birari on 22/11/12.
//  Copyright (c) 2012 Extentia Information Technology. All rights reserved.
//

#import "ViewController.h"
#import "FBEncryptorAES.h"
#import "NSData+Base64.h"
#import "RSA.h"
#import "ZipArchive.h"
#import "AppDelegate.h"
#import "AESCrypt.h"

@interface ViewController ()
{
    NSString *strQID;
    NSString *strSubQID;
    NSMutableArray *arrMainfiles;
    NSInteger nIndexPos;
    AppDelegate *appDelegate;
    NSString* UUIdentifier;
}

@end

@implementation ViewController
//- (void)viewDidLoad
//{
//    [super viewDidLoad];
//    [self getAllData];
//}

//-(void)getAllData
//{
//    NSURL *blogURL = [NSURL URLWithString:@"http://online.m-tutor.com/mtutor/gateway/course.php?uid=4&type=json&year=2"];
//    NSData *jsonData = [NSData dataWithContentsOfURL:blogURL];
//    NSError *error = nil;
//    NSDictionary *dataDictionary = [NSJSONSerialization
//                                    JSONObjectWithData:jsonData options:0 error:&error];
//    
//}

-(void)getTodayDate
{
    NSLocale *locle = [NSLocale currentLocale];
    NSString *str = [[NSDate date] descriptionWithLocale:locle];
    NSLog(@"Today Date is:\n%@",str);
    
    // or Use, HH for 24Hrs, hh for 12Hrs
    NSDate *dat = [NSDate date];
    NSDateFormatter *dateFormatter   = [[NSDateFormatter alloc] init];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneWithName:@"UTC+05:30"]];
    
    [dateFormatter setDateFormat:@"MM/dd/yyyy HH:mm:ss a"];
    
    NSString * dateString =[dateFormatter stringFromDate:dat];
    NSLog(@"dateString   = %@",dateString);
    
    //NSDate convert to NSString
    [dateFormatter setDateFormat:@"HH:mm:ss a"];
    
    NSString       *strDate          = [dateFormatter stringFromDate:dat];
    NSLog(@"strDate   = %@",strDate);
    
    // or Use
    NSLog(@"%@",[NSDate dateWithTimeIntervalSinceNow:0]);
}

-(void)getJson
{
    NSString *filepath = [[NSBundle mainBundle] pathForResource:@"params" ofType:@"json"];
    NSError *error;
    NSString *fileContents = [NSString stringWithContentsOfFile:filepath encoding:NSUTF8StringEncoding error:&error];
    
    NSString *trimmedString = [fileContents stringByTrimmingCharactersInSet:
                               [NSCharacterSet controlCharacterSet]];
    
    NSData *responseData= [trimmedString dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary* json = [NSJSONSerialization JSONObjectWithData:responseData
                                                         options:kNilOptions
                                                           error:&error];
    
    NSArray* latestLoans = [json objectForKey:@"lookup"];
    
    NSLog(@"loans: %@", latestLoans);
}

-(void)getUUIDDetails
{
    UUIdentifier = [[[UIDevice currentDevice] identifierForVendor] UUIDString]; // IOS 6+
    NSLog(@"output is : %@", UUIdentifier);
}
- (void)viewDidLoad
{
    [super viewDidLoad];//git hub tested by params
   
    // Get Today Date
    [self getTodayDate];
    
    // 1. Set Resources Library Assets List
    [self setResourcesAssetLib];
    
    // 2. make an UnZip
    [self getMakeUnzip];
    
    // 3. Get Json File
    [self getJson];
    
    // 4. Get UUID
    [self getUUIDDetails];
    
    // 5. Set Rotation
    appDelegate = (AppDelegate *) [[UIApplication sharedApplication]delegate];
    [appDelegate setShouldRotate:YES];
    
    // 6. Add Webview
    webViewTest = [[UIWebView alloc]initWithFrame:CGRectMake(0, 0, SCREEN_HEIGHT, SCREEN_WIDTH)];
    webViewTest.delegate = self;
    [webViewTest setMediaPlaybackRequiresUserAction:FALSE];
    [self.view addSubview:webViewTest];

    // 7. Access Encrypted Zip Files....
    [self getDecryptedFilesList:@"test"];
    [self getEncryptedFilesWithExtension:@"q_737595"];
    
//    [self makeEncryptionTest]; //Working fine....

}

#pragma mark - Set Resources Library Assets List

-(void)setResourcesAssetLib
{
    // SET RESOURCES ASSET HERE ....
    NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString *sourcePath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"resources1"];
    NSString *folderPath = [documentsDirectory stringByAppendingPathComponent:@"resources"];
    NSLog(@"Source Path: %@\n Documents Path: %@ \n Folder Path: %@", sourcePath, documentsDirectory, folderPath);
    NSLog(@"docdire: %@", documentsDirectory);
    
    NSError *error;
    if([[NSFileManager defaultManager] copyItemAtPath:sourcePath toPath:folderPath error:&error]){
        NSLog(@"File successfully copied");
    }
    else
    {
        NSLog(@"Error description-%@ \n", [error localizedDescription]);
        NSLog(@"Error reason-%@", [error localizedFailureReason]);
    }
}

#pragma mark - UnZipped files

-(void)getMakeUnzip
{
    NSString *unzipFileName = [self tempUnzipPath];
    NSString *filepath = [[NSBundle mainBundle] pathForResource:@"q_737625" ofType:@"zip"];
    ZipArchive *zipArchive = [[ZipArchive alloc] init];
    [zipArchive UnzipOpenFile:filepath Password:@"xxxxxx"];
    [zipArchive UnzipFileTo:unzipFileName overWrite:YES];
    [zipArchive UnzipCloseFile];
}

#pragma mark - Private

- (NSString *)tempUnzipPath
{
    NSString *path = [NSString stringWithFormat:@"%@/unZippedEncryptedFiles",
                      NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0]];
    NSURL *url = [NSURL fileURLWithPath:path];
    NSError *error = nil;
    [[NSFileManager defaultManager] createDirectoryAtURL:url
                             withIntermediateDirectories:YES
                                              attributes:nil
                                                   error:&error];
    if (error) {
        return nil;
    }
    return url.path;
}


-(void)getEncryptedFilesWithExtension:(NSString*)questionID
{
    // ENCRYPTED FILES PATH .....
    strQID = [[NSString alloc]init];
//    strQID=@"q_737552";
    strQID=questionID;
    NSString * resourcePath = [[NSBundle mainBundle] resourcePath];
    NSString * documentsPath = [resourcePath stringByAppendingPathComponent:strQID];
    NSError * error;
    NSArray* arrMaindirs = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:documentsPath
                                                                        error:&error];
    // MAIN DIRECTORY LIST .....
    for (int i=0; i<arrMaindirs.count; i++)
    {
        if ([arrMaindirs[i] isEqualToString:@"resources"])//SUB DIRECTORY for Resource
        {
            NSString *strDynmicsubID = [[NSString alloc]init];
            NSString *filename = arrMaindirs[i];
            NSString *strPath = [[NSString alloc]init];
            strPath = [documentsPath stringByAppendingPathComponent:filename];
            NSArray* dirsRes = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:strPath
                                                                                   error:&error];
            // RESOURCE DIRECTORY LIST .....
            for (int i=0; i<dirsRes.count; i++)
            {
                if ([arrMaindirs[i] isEqualToString:@".nomedia"])
                {
                }
                else
                {
                    NSLog(@"%@:",dirsRes);
                    strDynmicsubID = dirsRes[i]; // FOR GETTING SUB FOLDER ID...
                    strSubQID=strDynmicsubID;
                    strDynmicsubID = [strPath stringByAppendingPathComponent:strDynmicsubID];
                    
                    NSArray* dirsRes864433 = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:strDynmicsubID
                                                                                                 error:&error];
                    for (int i=0; i<dirsRes864433.count; i++) // GETTING FILES BASED ON SUB FOLDER ID .MP3 OR MP4
                    {
                        NSLog(@"%@:",dirsRes864433[i]);
                        NSString *filename1 = dirsRes864433[i];
                        NSString *extension1 = [[filename1 pathExtension] lowercaseString];
                        NSString *theFileName1 = [[filename1 lastPathComponent] stringByDeletingPathExtension];
                        strDynmicsubID = [strDynmicsubID stringByAppendingPathComponent:filename1];
                        
                        [self getMultipleCategoryFileEncAndDec: theFileName1 andExtension:extension1 andFilePath:strDynmicsubID];
                        strDynmicsubID = [strDynmicsubID stringByDeletingLastPathComponent];
                    }
                }
            }
        }
        else // MAIN DIRECTORY PATH AND FILES..
        {
            if ([arrMaindirs[i] isEqualToString:@".nomedia"])
            {
            }
            else
            {
                NSString *filename = arrMaindirs[i];
                NSString *extension = [[filename pathExtension] lowercaseString];
                NSString *theFileName = [[filename lastPathComponent] stringByDeletingPathExtension];
                
                NSString *strPath = [[NSString alloc]init];
                strPath = [documentsPath stringByAppendingPathComponent:filename];
                [self getMultipleCategoryFileEncAndDec:theFileName andExtension:extension andFilePath:strPath];
            }
        }
    }
}

#pragma mark - MULTIPLE CATEGORY
-(void)getMultipleCategoryFileEncAndDec:(NSString *)filename andExtension:(NSString *)extension andFilePath:(NSString *)encryptedfilePath
{
    //RSA
    NSString *filePrivate = [[NSBundle mainBundle] pathForResource:@"private" ofType:@"key"];
    NSString *strPrivateKey = [[NSString alloc]initWithContentsOfFile:filePrivate encoding:NSUTF8StringEncoding error:nil];
    
    NSString *stringFromFile = [[NSString alloc] initWithContentsOfFile:encryptedfilePath encoding:NSUTF8StringEncoding error:nil];
    NSArray *arr = [stringFromFile componentsSeparatedByString:@"~~~~~"];
    
    // IV BEFORE DECRYPT DECODE DATA
    NSData *decodedDataIV = [[NSData alloc] initWithBase64EncodedString:[arr objectAtIndex:0] options:0];
    NSData *decDataIV = [RSA decryptData:decodedDataIV privateKey:strPrivateKey];
    
    //IV AFTER DECRYPTED DECODE
    NSString *decodedStringIV = [[NSString alloc] initWithData:decDataIV encoding:NSUTF8StringEncoding];
    NSLog(@"%@", decodedStringIV);
    
    // HEADER DATA
    NSData *decodedDataHeader = [[NSData alloc] initWithBase64EncodedString:[arr objectAtIndex:1] options:0];
    NSData *decDataHeader = [RSA decryptData:decodedDataHeader privateKey:strPrivateKey];
    
    // KEY BEFORE DECRYPT DECODE DATA
    NSData *decodedDataKEY = [[NSData alloc] initWithBase64EncodedString:[arr objectAtIndex:2] options:0];
    NSData *decDataKEY = [RSA decryptData:decodedDataKEY privateKey:strPrivateKey];
    
    // KEY AFTER DECRYPTED DECODE
    NSString *decodedStringKEY = [[NSString alloc] initWithData:decDataKEY encoding:NSUTF8StringEncoding];
    NSLog(@"%@", decodedStringKEY);
    
    // IV DECODE DATA FOR AES
    NSData *secDecodeIV = [[NSData alloc] initWithBase64EncodedString:decodedStringIV options:0];
    NSLog(@"%@", secDecodeIV);
    
    // KEY DECODE DATA FOR AES
    NSData *secDecodeKEY = [[NSData alloc] initWithBase64EncodedString:decodedStringKEY options:0];
    NSLog(@"%@", secDecodeKEY);
    
    NSData *removeBase641 = [[NSData alloc] initWithBase64EncodedString:[arr objectAtIndex:3] options:0];
    NSData *hidDecodeData1 = [FBEncryptorAES decryptData:removeBase641 key:secDecodeKEY iv:secDecodeIV];
    
    NSMutableData *concatenatedData = [NSMutableData data];
    [concatenatedData appendData:decDataHeader];
    [concatenatedData appendData:hidDecodeData1];
    
    [self getWritetoFilewithFileName:[NSString stringWithFormat:@"%@.%@",filename,extension] andData:concatenatedData];
}


// GETTING DECRYPTED FILES PATH .....
-(void)getWritetoFilewithFileName:(NSString *)filename andData:(NSMutableData*)concatenatedData
{
    NSString *stringPath;
    if (strSubQID) // SUB FOLDER PATH.....
    {
        stringPath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)objectAtIndex:0]stringByAppendingPathComponent:strQID];
        
        stringPath = [stringPath stringByAppendingPathComponent:@"resources"];

        NSError *error = nil;
        if (![[NSFileManager defaultManager] fileExistsAtPath:stringPath])
        {
            [[NSFileManager defaultManager] createDirectoryAtPath:stringPath withIntermediateDirectories:YES attributes:nil error:&error]; //mainQID
        }
        
        stringPath = [stringPath stringByAppendingPathComponent:strSubQID];
        
        if (![[NSFileManager defaultManager] fileExistsAtPath:stringPath])
        {
            [[NSFileManager defaultManager] createDirectoryAtPath:stringPath withIntermediateDirectories:YES attributes:nil error:&error]; //SubQID
        }
    }
    else // MAIN FOLDER PATH
    {
        stringPath = [[NSString alloc]init];
        stringPath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)objectAtIndex:0]stringByAppendingPathComponent:strQID];
    }
    
    NSError *error = nil;
        if (![[NSFileManager defaultManager] fileExistsAtPath:stringPath])
        {
            [[NSFileManager defaultManager] createDirectoryAtPath:stringPath withIntermediateDirectories:NO attributes:nil error:&error];// QID folder creation here
        }
    
    NSString *filePath1 = [stringPath stringByAppendingPathComponent:filename];
    NSLog(@"Detect path:\n%@",filePath1);
    [concatenatedData writeToFile:filePath1 atomically:YES];
    
}

-(void)getDecryptedFilesList:(NSString *)filenamejson
{
    NSString *stringPath;
//    stringPath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)objectAtIndex:0]stringByAppendingPathComponent:strQID];
    stringPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)objectAtIndex:0];
    
    NSError * error;
    //veda
//    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"test" ofType:@"json"];
    NSString *filePath = [[NSBundle mainBundle] pathForResource:filenamejson ofType:@"json"];
    NSData *testData = [NSData dataWithContentsOfFile:filePath];
    NSDictionary *testJson = [NSJSONSerialization JSONObjectWithData:testData options:kNilOptions error:&error];
    NSLog(@"json: %@", [testJson objectForKey:@"lookup"]);
    
    NSMutableArray *arrFiles = [testJson objectForKey:@"lookup"];
    arrMainfiles = [[NSMutableArray alloc]init];

    for (int i=0; i<[arrFiles count]; i++) {
        [arrMainfiles addObject:[[[arrFiles objectAtIndex:i] objectForKey:@"file"] objectForKey:@"mainfile"]];
    }
    
    NSLog(@"All main files: %@",arrMainfiles);
    nIndexPos=0;
    [self getReadDecryptedJsonFilesList:nIndexPos];
    
}

-(void)getReadDecryptedJsonFilesList:(NSInteger )nIndex
{
    NSString *stringPath;
    stringPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)objectAtIndex:0];
    NSString *filename = arrMainfiles[nIndex];
    NSString *strPath = [[NSString alloc]init];
    strPath = [stringPath stringByAppendingPathComponent:filename];
    
    NSURL *nsurl=[NSURL fileURLWithPath:strPath];
    NSURLRequest *nsrequest=[NSURLRequest requestWithURL:nsurl];
    [webViewTest loadRequest:nsrequest];
}

#pragma mark - webviewDelegate Method
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSURL *requestURL = [request URL];
    if ([[[requestURL absoluteString] lastPathComponent] isEqualToString: @"next.html"])
    {
        NSLog(@"Next File have to play===> %@", [[requestURL absoluteString] lastPathComponent]);
        if (arrMainfiles.count-1==nIndexPos)
        {
            strSubQID = [[NSString alloc]init];
            strSubQID =nil;
            [self getDecryptedFilesList:@"test1"];
            [self getEncryptedFilesWithExtension:@"q_737552"];
//            [self removeImage:@"q_737595"];
            return NO; //final touch deleted files here ....
        }
        else
            nIndexPos++;
        
        [self getReadDecryptedJsonFilesList:nIndexPos];
    }
    return YES;
}

- (void)removeImage:(NSString *)filename
{
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    
    NSString *filePath = [documentsPath stringByAppendingPathComponent:filename];
    NSError *error;
    BOOL success = [fileManager removeItemAtPath:filePath error:&error];
    if (success) {
        UIAlertView *removedSuccessFullyAlert = [[UIAlertView alloc] initWithTitle:@"Congratulations:" message:@"Successfully removed" delegate:self cancelButtonTitle:@"Close" otherButtonTitles:nil];
        [removedSuccessFullyAlert show];

    }
    else
    {
        NSLog(@"Could not delete file -:%@ ",[error localizedDescription]);
    }
}


-(BOOL)shouldAutorotate
{
    return NO;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    
    if (UIInterfaceOrientationMaskLandscapeLeft | UIInterfaceOrientationMaskLandscapeRight)
    {
        [webViewTest setFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];

    }
    return (UIInterfaceOrientationMaskLandscapeLeft);
}

#pragma mark - ENCRYPTION 
-(void)makeEncryptionTest
{
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"test1" ofType:@"json"];
    NSString *strPlainText = [[NSString alloc]initWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    NSString *password = @"p4ssw0rd";//UUID
    UUIdentifier=password;
    NSString *encryptedData = [AESCrypt encrypt:strPlainText password:UUIdentifier];
    NSString *decryptedMessage1 = [AESCrypt decrypt:encryptedData password:UUIdentifier];
    NSLog(@"%@",decryptedMessage1);

}
-(void)makeFileEncryption:(NSString *)filename andExtension:(NSString *)extension andFilePath:(NSString *)filePath
{
    //RSA
    NSString *filePrivate = [[NSBundle mainBundle] pathForResource:@"private" ofType:@"key"];
    NSString *strPrivateKey = [[NSString alloc]initWithContentsOfFile:filePrivate encoding:NSUTF8StringEncoding error:nil];
    
    NSString *stringFromFile = [[NSString alloc] initWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    NSArray *arr = [stringFromFile componentsSeparatedByString:@"~~~~~"];
    
    // IV BEFORE DECRYPT DECODE DATA
    NSData *decodedDataIV = [[NSData alloc] initWithBase64EncodedString:[arr objectAtIndex:0] options:0];
    NSData *decDataIV = [RSA decryptData:decodedDataIV privateKey:strPrivateKey];
    
    //IV AFTER DECRYPTED DECODE
    NSString *decodedStringIV = [[NSString alloc] initWithData:decDataIV encoding:NSUTF8StringEncoding];
    NSLog(@"%@", decodedStringIV);
    
    // HEADER DATA
    NSData *decodedDataHeader = [[NSData alloc] initWithBase64EncodedString:[arr objectAtIndex:1] options:0];
    NSData *decDataHeader = [RSA decryptData:decodedDataHeader privateKey:strPrivateKey];
    
    // KEY BEFORE DECRYPT DECODE DATA
    NSData *decodedDataKEY = [[NSData alloc] initWithBase64EncodedString:[arr objectAtIndex:2] options:0];
    NSData *decDataKEY = [RSA decryptData:decodedDataKEY privateKey:strPrivateKey];
    
    // KEY AFTER DECRYPTED DECODE
    NSString *decodedStringKEY = [[NSString alloc] initWithData:decDataKEY encoding:NSUTF8StringEncoding];
    NSLog(@"%@", decodedStringKEY);
    
    // IV DECODE DATA FOR AES
    NSData *secDecodeIV = [[NSData alloc] initWithBase64EncodedString:decodedStringIV options:0];
    NSLog(@"%@", secDecodeIV);
    
    // KEY DECODE DATA FOR AES
    NSData *secDecodeKEY = [[NSData alloc] initWithBase64EncodedString:decodedStringKEY options:0];
    NSLog(@"%@", secDecodeKEY);
    
    NSData *removeBase641 = [[NSData alloc] initWithBase64EncodedString:[arr objectAtIndex:3] options:0];
    NSData *hidDecodeData1 = [FBEncryptorAES decryptData:removeBase641 key:secDecodeKEY iv:secDecodeIV];
    
    NSMutableData *concatenatedData = [NSMutableData data];
    [concatenatedData appendData:decDataHeader];
    [concatenatedData appendData:hidDecodeData1];
    
    [self getWritetoFilewithFileName:[NSString stringWithFormat:@"%@.%@",filename,extension] andData:concatenatedData];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc {
    [webViewTest release];
    [super dealloc];
}
@end
