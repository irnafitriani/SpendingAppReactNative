Feature: Register feature

  Scenario: Register success
    Given I press "Do not have an account, Sign Up!"
    Then I wait
    Then I enter "new user" into input field number 1
    Then I enter "new_usert@gmail.com" into input field number 2
    Then I enter "123456" into input field number 3
    Then I enter "123456" into input field number 4
    Then I press "Sign Up"
    Then I should see "User has been created"

  Scenario: Register fail, email already in use
    Given I press "Do not have an account, Sign Up!"
    Then I wait
    Then I enter "new user" into input field number 1
    Then I enter "new_usert@gmail.com" into input field number 2
    Then I enter "123456" into input field number 3
    Then I enter "123456" into input field number 4
    Then I press "Sign Up"
    Then I should see "The email address is already in use by another account."

  Scenario: Register fail, must fill all fields
    Given I press "Do not have an account, Sign Up!"
    Then I wait
    Then I enter "new user" into input field number 1
    Then I enter "new_usert@gmail.com" into input field number 2
    Then I enter "123456" into input field number 3
    Then I press "Sign Up"
    Then I should see "Please fill all fields"

  Scenario: Register fail, password too weak
    Given I press "Do not have an account, Sign Up!"
    Then I wait
    Then I enter "new user" into input field number 1
    Then I enter "new_usert@gmail.com" into input field number 2
    Then I enter "12356" into input field number 3
    Then I enter "12356" into input field number 4
    Then I press "Sign Up"
    Then I should see "The password is too weak"

  Scenario: Register fail, password not valid
    Given I press "Do not have an account, Sign Up!"
    Then I wait
    Then I enter "new user" into input field number 1
    Then I enter "new_usert@gmail.com" into input field number 2
    Then I enter "123456" into input field number 3
    Then I enter "012345" into input field number 4
    Then I press "Sign Up"
    Then I should see "Passwords invalid, confirm password is not equal."
