# BCGOV-APPINV - Assumptions

This document consists of multiple parts; for a directory to all of the
parts, see [Overview](../README.md).

This part of the document explains assumptions that I made when
making the project in aid of keeping it simpler.

A key assumption is that the scale is small enough that it is okay to fetch
all records and display them on the main screen, without paging.  And
similarly that it was okay to use a JSON file for storage rather than a
DBMS.

An assumption is that it is okay for every product detail to be of type
text, and unrestricted other than having to be nonempty, rather than any
enforced numeric or date or other formats, to keep things simpler, and
so you have maximum flexibility for what to put in it.
