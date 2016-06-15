//
//  ViewController.swift
//  dragdrop
//
//  Created by Jeremy Feldman on 6/13/16.
//  Copyright © 2016 Jeremy Feldman. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UIWebViewDelegate {

    @IBOutlet weak var webview: UIWebView!
    
    override func viewWillAppear(animated: Bool) {
        if let url = NSBundle.mainBundle().URLForResource("index", withExtension: "html", subdirectory: "www") {
            let fragURL = NSURL(string: "#FRAG_URL", relativeToURL: url)!
            let request = NSURLRequest(URL: fragURL)
            webview.delegate = self
            webview.scalesPageToFit = true
            webview.contentMode = UIViewContentMode.ScaleAspectFit
            webview.loadRequest(request)
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        
        let reqUrlStr: String = request.URL!.absoluteString;
        //let newUrlStr = reqUrlStr.stringByReplacingOccurrencesOfString("custom://stuff?data=", withString: "")
        
        print(reqUrlStr.stringByRemovingPercentEncoding);
        
        if let scheme = request.URL?.scheme {
            if scheme == "custom" {
                // captured data from webview
                NSLog("Received custom data with scheme: \(scheme)");
                
                let url = NSBundle.mainBundle().URLForResource("index", withExtension: "html", subdirectory: "www")
                let injURL = NSURL(string: "#FRAG_URL?data=", relativeToURL: url)!
                let request = NSURLRequest(URL: injURL);
                webview.loadRequest(request);
                webview.stringByEvaluatingJavaScriptFromString("webviewCallbackFunction()");
                
                return false;
            }
        }
        
        return true;
    }


}

