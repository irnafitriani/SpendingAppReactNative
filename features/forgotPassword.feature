Feature: Reset password feature

  Scenario: Reset password success
    Given I press "Forgot Password?"
    Then I wait
    Then I enter "new_usert@gmail.com" into input field number 1
    Then I press "Reset Password"
    Then I should see "Email has been sent!"

  Scenario: Cancel reset password, return to Login page
    Given I press "Forgot Password?"
    Then I wait
    Then I enter "new_usert@gmail.com" into input field number 1
    Then I press "Back to Sign In"
    Then I should see "Sign In"

  Scenario: Reset password fail, email not exist
    Given I press "Forgot Password?"
    Then I wait
    Then I enter "old_user@gmail.com" into input field number 1
    Then I press "Reset Password"
    Then I should see "There is no user record corresponding to this identifier. The user may have been deleted."
