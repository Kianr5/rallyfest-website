# RallyFest Website

Official website for **RallyFest**, the festival-style 3v3 soccer event owned
and operated by **Rostami Group LLC**.

------------------------------------------------------------------------

## Project Overview

This repository contains the source code and assets for the official RallyFest
website.

The website will:

-   Present RallyFest as the primary public-facing brand
-   Showcase the RallyFest experience and Seattle-area pilot
-   Collect pilot registrations
-   Provide sponsor information
-   Serve as the official online presence for RallyFest

------------------------------------------------------------------------

## Technology Stack

-   HTML
-   CSS
-   Vanilla JavaScript
-   GitHub Pages (hosting)
-   Tally (embedded registration form)

No backend or database is used for the initial MVP.

------------------------------------------------------------------------

## Project Structure

``` text
rallyfest-website/
├── README.md
├── company-overview.md
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── logos/
│   │   └── rally-sports-logo.png
│   ├── images/
│   └── icons/
```

------------------------------------------------------------------------

## Source of Truth

`company-overview.md` is the source of truth for the legal company structure,
corporate ownership, and relationship between RallyFest and Rostami Group LLC:

``` text
company-overview.md
```

The customer-facing website remains focused on RallyFest. Rostami Group LLC is
identified only where formal ownership, legal, privacy, registration, contact,
or business-entity language requires it.

------------------------------------------------------------------------

## Design Goals

The website should be:

-   Modern
-   Premium
-   Athletic
-   Community-focused
-   Mobile responsive
-   Fast-loading
-   Easy to maintain

------------------------------------------------------------------------

## Development Workflow

1.  Update `company-overview.md` when corporate information changes.
2.  Use Codex to generate or modify website code.
3.  Review changes.
4.  Commit changes to GitHub.
5.  GitHub Pages publishes the latest version.

------------------------------------------------------------------------

## Status

**Current Phase:** RallyFest pilot pre-registration

The website is a static HTML/CSS/JavaScript site hosted with GitHub Pages. Its
pre-registration flow uses an embedded Tally form.
