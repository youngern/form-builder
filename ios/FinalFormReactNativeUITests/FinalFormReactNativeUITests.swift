//
//  FinalFormReactNativeUITests.swift
//  FinalFormReactNativeUITests
//
//  Created by Youngern Song on 4/12/20.
//

import XCTest

class FinalFormReactNativeUITests: XCTestCase {

    override func setUp() {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
      let app = XCUIApplication()
      setupSnapshot(app)
      app.launch()
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

  
    func testExample() {
      let app = XCUIApplication()
      let mainWindow = app.windows.firstMatch
              // UI tests must launch the application that they test.
      snapshot("01InitialScreen")
      
      let addButton = mainWindow.otherElements["AddButton"]
      addButton.tap()
      
      snapshot("02AddField")
      
      let closeButton = mainWindow.otherElements["CloseIcon"]
      closeButton.tap()
      
            
            
        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
      
    }

    func testLaunchPerformance() {
        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, *) {
            // This measures how long it takes to launch your application.
            measure(metrics: [XCTOSSignpostMetric.applicationLaunch]) {
                XCUIApplication().launch()
            }
        }
    }
}
