Feature: Login feature

  Scenario: As a valid user I can log into my app+
    Given I am on the Login Screen
    Then I touch the "Email" input field
    Then I use the keyboard and type test@gmail.com 
    Then I touch the "Password" input field
    Then I use the keyboard and type "123456"
    Then I touch "Sign In"
    Then I wait
    Then I should see Dashboard Screen