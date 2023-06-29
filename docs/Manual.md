# BCGOV-APPINV - End User Manual

This document consists of multiple parts; for a directory to all of the
parts, see [Overview](../README.md).

This part of the document explains what regular end users, who are simply
using an already deployed instance of BCGOV-APPINV, need to know.

BCGOV-APPINV is a simple web-based database application that
empowers an organization to track and manage applications that they are
developing, tracking details for each such as its product title, start
date, and names of people in various roles; it supports listing, viewing,
adding, editing, and removing product records.

To be more specific, it models a set of products, such that each product
has its own identity with its own distinct Product Number/SID.
Each product also has a Product Name, Scrum Master Name, Product Owner Name,
Developer Names, Start Date, Methodology, Location.

Every product detail is actually of type text, even if it looks like a
number or a date, so you have maximum flexibility for what to put in it.
The only formatting constraint is that any leading or trailing whitespace
in each field will be stripped out on saving.

The web application has 4 main screens: View All Products, Add a Product,
Edit a Product, and Delete a Product.

## View All Products

The View All Products screen displays all products in the database at once,
arranged in a list in the order added, one product per line.

This screen shows all details for each product, as there aren't a lot of
the details so they fit easily and it means everything is accessable in one
place.

Above the list is a "Search For" field; if it is nonempty (leading and
trailing whitespace is ignored) then the list of products will be filtered
to those for which any field contains the search text as a substring.

Beside each product are 2 links titled "Edit" and "Delete", such that
clicking on one of them takes you to the Edit a Product and Delete a
Product page specific to that product.

Above the list is a link to "Add" a new product, that goes to the Add a
Product screen.

## Add/Edit/Delete Product

Each of these screens shows the full details of a product.  The Add/Edit
screens allow input or editing of all product information except Product
Number/SID, as the latter is generated.  The Delete screen just displays those
details without being editable.

To use each screen, fill in or edit the fields as applicable, and then
click a button at the bottom to save changes (or delete the record).

All fields must always be populated, but that only one Developer Name is
required.

When clicking the button for Add or Edit, if any mandatory fields were left
blank then it should tell you with a floating balloon message by the first
offending field.

Otherwise when clicking the button, a modal alert message will appear that
either states the changes were saved/deleted, or that they weren't because
of a typically server side problem, in which case you could retry.

After dismissing the modal message, you will still be on the same screen;
on the Edit version you can choose to Edit more and save again if you want.

When you are done / success, you will need to click the "Return" link at
the top left to go back to the View All Products screen and see the result
of your add/edit/delete reflected there.

If you stay on the Add screen, you can keep adding more records with
suitable edits.  If you stay on the Delete screen, it will still have a
button but that will then be an invalid operation, that would report
failure the second time since the record is already gone.
