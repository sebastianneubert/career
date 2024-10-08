# The career summary

## About me

Experienced Quality Manager adept in overseeing automated testing, QA operations, and implementing advanced testing tools. 
Develops technology-driven strategies with a focus on risk-based decision-making and team support.

[Read more](https://flowcv.me/sebastian-neubert-2k)

## About this Repository

- Simple cypress tests running on Github action

run on your local machine:

```bash
# requirement: install bun.sh and clone the repo
bun x cypress open
```

### technology inside

1. using typescript as test language
1. bun as package manager
1. prettier as code formatter
1. cypress as test runner
1. cypress-each as cypress plugin
1. using cypress-testing-library as cypress plugin to select by roles
1. adding custom commands for selecting buttons and checking https cert expiry
1. using github-actions to trigger test runs in github, ignoring README.md changes
1. add HTML report for the tests and make it downloadable via artifacts
1. add [Gitlab repository](https://gitlab.com/sebastianneubert/career) and a CI/CD Pipeline to deploy HTML report to [Gitlab Page](https://career-sebastianneubert-ffc27c129511b44eb40d51ef1da9b8f9881caef.gitlab.io/)
 