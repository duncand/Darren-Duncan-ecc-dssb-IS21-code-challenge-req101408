# Province of British Columbia Application Inventory (BCGOV-APPINV)

This document describes BCGOV-APPINV, a simple web-based database application that
empowers an organization to track and manage applications that they are
developing, tracking details for each such as its product title, start
date, and names of people in various roles; it supports listing, viewing,
adding, editing, and removing product records.

BCGOV-APPINV is implemented as a pair of applications named BCGOV-APPINV-DBMS and
BCGOV-APPINV-WEBAPP, such that the latter is what end users typically interact
with directly using a generic web browser, and the former is a supporting
service providing a RESTful API that the latter consumes.

## Quick Links

The canonical home of this BCGOV-APPINV source code is
<https://github.com/duncand/Darren-Duncan-ecc-dssb-IS21-code-challenge-req101408>.

When you have this running locally using the example Local Deployment
configuration, these following links should work.

Visit <http://localhost:8080> in a web browser to
actually use the application as a regular end user.

Visit <http://localhost:3000/api/api-docs> to view the
interactive REST API documentation which lets you invoke the API directly.

For your convenience, following delivery of this project proper,
I may stand up a temporary live deployment of BCGOV-APPINV on Heroku,
so you can try it out without actually having to run it on your own machine;
you may then find those instances running at the following urls;
you can ask me if you don't see it there.

Visit <http://req101408-bcgov-appinv-webapp.herokuapp.com> in a web browser to
actually use the application as a regular end user.

Visit <http://req101408-bcgov-appinv-dbms.herokuapp.com/api/api-docs> to view the
interactive REST API documentation which lets you invoke the API directly.

## Contents

This document consists of multiple parts:

1. BCGOV-APPINV - Overview (the current part)
1. [BCGOV-APPINV - End User Manual](docs/Manual.md)
1. [BCGOV-APPINV - Structure](docs/Structure.md)
1. [BCGOV-APPINV - Local Deployment and Testing](docs/Local.md)
1. [BCGOV-APPINV - Assumptions](docs/Assumptions.md)

The [BCGOV-APPINV - End User Manual](docs/Manual.md) part is what regular end
users, who are simply using an already deployed instance of BCGOV-APPINV, need to
know; the other documentation parts are mainly for someone wanting to
deploy or develop the application or otherwise learn more about how it
works internally.

## Author

Darren Duncan - darren@DarrenDuncan.net

## License and Copyright

BCGOV-APPINV is Copyright © 2023, Darren Duncan.

BCGOV-APPINV is free software;
you can redistribute it and/or modify it under the terms of the Apache
License, Version 2.0 (AL2) as published by the Apache Software Foundation
(<https://www.apache.org>).  You should have received a copy of the
AL2 as part of the BCGOV-APPINV distribution, in the file
[LICENSE/Apache-2.0.txt](LICENSE/Apache-2.0.txt); if not, see
<https://www.apache.org/licenses/LICENSE-2.0>.

Any versions of BCGOV-APPINV that you modify and distribute must carry prominent
notices stating that you changed the files and the date of any changes, in
addition to preserving this original copyright notice and other credits.
BCGOV-APPINV is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
