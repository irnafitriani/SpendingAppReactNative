Feature: Login feature

  Scenario: As a valid user I can log into SpendingApp
    Then I enter "test@gmail.com" into input field number 1 
    Then I enter "123456" into input field number 2
    Then I press "Sign In"
    Then I wait    
    Then I should see "Dashboard"

  Scenario: As invalid user, I can't log into SpendingApp
    Then I enter "test@gmail.com" into input field number 1 
    Then I enter "1234567" into input field number 2
    Then I press "Sign In"
    Then I wait    
    Then I should see "The password is invalid or the user does not have a password."
