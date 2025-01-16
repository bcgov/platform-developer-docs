---
title: Install the oc command line tool

slug: install-the-oc-command-line-tool

description: Describes how to install the oc command line tool for mac and windows 

keywords: OpenShift, command line, oc, brew, cli

page_purpose: Describes the installation of the oc command line tool for users preparing to use OpenShift 

audience: technical lead, openshift 101 students, developers

author: Matt Spencer  

editor: Pilar Solares

content_owner: Faisal Hamood

sort_order: 4
---

# Install the oc command line tool
Last updated: **Oct 5, 2023**

Users can interact with OpenShift via the `oc` command line tool. This can be installed on your local machine, or accessed via the web console. It is important to keep your version of `oc` up to date to match the version of `oc` on the cluster. 

## On this page
* [**Install oc on a mac**](#install-oc-on-a-mac) 
* [**Install oc on windows**](#install-oc-on-windows)
* [**Logging in to the CLI using a web browser**](#logging-in-to-the-cli-using-a-web-browser)
* [**Use the web terminal**](#use-the-web-terminal)
* [**Related pages**](#related-pages)

<!-- ### End of On this page -->
!!! note
    There are different ways to install the oc command line tool. Look into the section "On this page" to your right to view instructions to navigate the options for each operating system. 

## Install oc on a mac

<iframe width="560" height="315" src="https://www.youtube.com/embed/ylzpex7kbKs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
 
### Install homebrew
 
1. Open Terminal 
2. Install [homebrew](https://brew.sh/) by running this statement in your terminal: 
 
     `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
 
3. Be sure to follow 'the next steps' in the output to add homebrew to your PATH. 

### Install openshift-cli (oc)

1. After installing homebrew, use the command `brew install openshift-cli` to install the `oc` command line tool. 
2. When installation is complete, run `oc version` to confirm successful installation. A successful installation should return the version number of `oc`. 

Please note, `oc version` may also return an error `'error: You must be logged in to the server (Unauthorized)` until you complete the next step. 

### Test oc login

1. In order to login with the `oc` command line tool, first login to the [OpenShift Web Console](https://console.apps.silver.devops.gov.bc.ca/). For instructions, see the [Login to OpenShift Web Console](../openshift-projects-and-access/login-to-openshift.md) page 

2. Click on your name at the top-right corner of the screen, and choose: Copy login command

3. A new tab will open in your browser. You'll need to login again by clicking the button: **Developer Log In** 

4. Next, you'll be directed to a page with a link to **Display Token**. Please do not share your tokens capture them on screen recordings as these grant access to OpenShift on your behalf. Click the link to reveal your tokens

5. Copy the entire line of text under: Log in with this token

6. Paste this command into your terminal and run it. If successful, you should see an indication of which cluster you've logged in to, along with the number of projects you have access to and the project you are currently working in.

### Update oc

To ensure compatibility as features change, please update your `oc` command line tool regularly. You can use `brew upgrade openshift-cli` to achieve this if you installed `oc` using [homebrew](https://brew.sh/) as described above. 

##  Install oc on windows

<iframe width="560" height="315" src="https://www.youtube.com/embed/ylzpex7kbKs?start=132" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Install wsl 

In the [OpenShift 101 training](../training-and-learning/training-from-the-platform-services-team.md), we suggest that new users install Windows Subsystem for Linux (WSL) first, and then install `oc` within `WSL` using [homebrew](https://brew.sh/). This is to maintain direct compatibility between the commands used across operating systems. 

1. Open PowerShell or Windows Command Prompt in administrator mode by right-clicking and selecting "Run as administrator"

2. Run the command `wsl --install`

3. After completion of this command, you'll need to restart your computer to continue installing Ubuntu in WSL. 

4. During the Ubuntu install process, you'll be prompted to setup a new username and password for the Ubuntu installation. Please make sure to remember this new username and password as you will need it later. 

### Install homebrew

From within your WSL terminal, install homebrew. You may need to disconnect from the VPN/BC Gov network in order to complete these steps:

1. Install [homebrew](https://brew.sh/) by running `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` in your WSL terminal. You'll be prompted for the sudo password that you created earlier. 
2. Be sure to follow the steps in the output to add homebrew to your PATH. 

### Install openshift-cli (oc)

Once homebrew is installed:

1. Use the command `brew install openshift-cli` to install the `oc` command line tool 
2. When installation is complete, run `oc version` to confirm successful installation. A successful installation should return the version number of `oc`

Please note, `oc version` may also return an error `'error: You must be logged in to the server (Unauthorized)` until you complete the next step. 

### Test oc login

1. In order to login with the `oc` command line tool, first login to the [OpenShift Web Console](https://console.apps.silver.devops.gov.bc.ca/). For instructions, see the [Login to OpenShift Web Console](../openshift-projects-and-access/login-to-openshift.md) page 

2. Click on your name at the top-right corner of the screen, and choose: Copy login command

3. A new tab will open in your browser. You'll need to login again by clicking the button: **Developer Log In** 

4. Next, you'll be directed to a page with a link to **Display Token**. Please do not share your tokens capture them on screen recordings as these grant access to OpenShift on your behalf. Click the link to reveal your tokens

5. Copy the entire line of text under: Log in with this token

6. Paste this command into your terminal and run it 

If successful, you should see an indication of which cluster you've logged in to, along with the number of projects you have access to and the project you are currently working in.

### Update oc
To ensure compatibility as features change, please update your `oc` command line tool regularly. You can use `brew upgrade openshift-cli` to achieve this if you installed `oc` using [homebrew](https://brew.sh/) as described above. 

## Logging in to the CLI using a web browser
With OCP 4.14, a new oc command-line interface (CLI) flag, `--web` is now available for the oc login command. With this enhancement, you can log in by using a web browser, so that you do not need to insert your access token into the command line.


For example, to login to Silver cluster, instead of providing a token, use the web option:
`oc login --server=https://api.silver.devops.gov.bc.ca:6443 --web`

You'll be redirected to the default browser and complete the login process from there. Once logged in, you'll the message "access token received successfully; please return to your terminal".


Pro tip: you can setup alias to fully remove the need of copy-pasting the login command from the browser, this would be pretty helpful especially if you are working on multiple clusters.


## Use the web terminal

<iframe width="560" height="315" src="https://www.youtube.com/embed/ylzpex7kbKs?start=335" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

If you can't install `oc` locally, you may wish to use the OpenShift web terminal for some purposes. More information is [available from Redhat](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.13/html/web_console/web-terminal). 

<br>

---
---

## Related pages

- [Homebrew](https://brew.sh/)
- [Login to OpensShift Web Console](../openshift-projects-and-access/login-to-openshift.md) 
- [OpenShift Web Terminal - Redhat](https://docs.openshift.com/container-platform/4.13/web_console/web_terminal/odc-using-web-terminal.html)
- [Installing the OpenShift CLI by using the web console](https://docs.openshift.com/container-platform/4.12/cli_reference/openshift_cli/getting-started-cli.html#cli-installing-cli-web-console_cli-developer-commands)

---
