Feature: Running a test
    As an iOS developer
    I want to have a sample feature file
    So I can begin testing quickly

Scenario: Login
    Given I am on the Login Screen
    Then I touch the "Email" input field
    Then I user the keyboard and type "test1@test.com"
    Then I touch the "Password" input field
    Then I use the keyboard and type "12345678"
    Then I touch "SIGN IN"
    Then I wait
    Then I should see the dashboard page