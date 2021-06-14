describe('purchase', function () {

    var UsernameField = element(by.id('user-name'));
    var PasswordField = element(by.id('password'));
    var LoginButton = element(by.id('login-button'));
    var ShopppingCart = element(by.xpath('//*[@id="shopping_cart_container"]/a/span'));
    var AddBackpackItem = element(by.id('add-to-cart-sauce-labs-backpack'));
    var RemoveBackpackItem = element(by.id('remove-sauce-labs-backpack'));
    var TitleHeader = element(by.xpath('//*[@id="header_container"]/div[2]/span'));
    var AddBikeLight = element(by.id('add-to-cart-sauce-labs-bike-light'));
    var CheckoutButton = element(by.id('checkout'));
    var FirstNameCheckout = element(by.id('first-name'));
    var LastNameCheckout = element(by.id('last-name'));
    var PostalCodeCheckout = element(by.id('postal-code'));
    var ContinueCheckoutButton = element(by.id('continue'));
    var FinishCheckoutButton = element(by.id('finish'));
    var CheckoutContainer = element(by.id('checkout_complete_container'));
    var MenuButton = element(by.id('react-burger-menu-btn'));
    var LogoutLink = element(by.id('logout_sidebar_link'));
   

    function Login(username, password) {
        UsernameField.sendKeys(username);
        PasswordField.sendKeys(password);
        LoginButton.click();
    }

    function FillYourInformation(name, lastName, postalcode) {
        FirstNameCheckout.sendKeys(name);
        LastNameCheckout.sendKeys(lastName);
        PostalCodeCheckout.sendKeys(postalcode);        
    }

    function Logout() {
        MenuButton.click();
        browser.wait(LogoutLink.isDisplayed(), 10000);
        LogoutLink.click();
                   }

    beforeEach(function () {

        browser.waitForAngularEnabled(false);
        browser.get('https://www.saucedemo.com/');
    });

    it('Complete checkout of a item', function () { 
        Login('standard_user', 'secret_sauce'); 
            
        //Validate login success
        expect(TitleHeader
            .getText()).toEqual('PRODUCTS');

        //Add a product
        AddBackpackItem.click();
        expect(ShopppingCart.getText()).toEqual('1');

        //Remove a product on All items page
        RemoveBackpackItem.click();
        AddBackpackItem.isDisplayed();

        //Add two products and remove one on CART page
        AddBikeLight.click();
        AddBackpackItem.click();
        expect(ShopppingCart.getText()).toEqual('2');

        ShopppingCart.click();
        expect(TitleHeader.getText()).toEqual('YOUR CART');
        RemoveBackpackItem.click();
               
        //complete checkout
        CheckoutButton.click();
        expect(TitleHeader.getText()).toEqual('CHECKOUT: YOUR INFORMATION');
        FillYourInformation('Judy', 'Cabanzo', '33226');
        ContinueCheckoutButton.click();
        expect(TitleHeader.getText()).toEqual('CHECKOUT: OVERVIEW');
        FinishCheckoutButton.click();
        expect(TitleHeader.getText()).toEqual('CHECKOUT: COMPLETE!');

        //verify Thank you Page
        expect(CheckoutContainer.getText()).toContain('THANK YOU FOR YOUR ORDER');
        
                      
        //logout
        Logout();
        LoginButton.isDisplayed();


    });

   

});