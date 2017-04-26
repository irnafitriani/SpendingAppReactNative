Feature: Login feature

  Scenario: As a valid user I can log into my app
    Then I enter "test@gmail.com" into input field number 1 
    Then I enter "123456" into input field number 2
    Then I press button number 0
    Then I wait
    Then I should see "Dashboard"