## Design
This API is designed for the user to be able to add to a to-do list, edit the to-do list, and view the to-do list. The user should be able to create an item, edit an item, delete an item, and view all items on the todo list.

## How to Run
The program is run through through the server at port 3000, using node.js and npm, by typing "npm run dev" in the terminal.

## How to Test
The program is tested using Jest and Supertest, with a test.js file that details what each test's expected response should be. There is a test for each route for the todo list (create (POST request), list/index (GET request), get one item (GET request), update (PUT request), and delete (DELETE request)). The test is run by opening two terminals, and starting the server in one (npm run dev) and typing "npm run test" in the other.

All tests should now pass.

### Load Testing Results

Load testing was done through Artillery with yml file. The load that was tested was the create route POST request.

Over one minute, 20 scenarios were launched every second, with a total of 1200 scenarios launched. All 1200 or 100% of scenarios were complete in this test. The mean response/second was 19.85. Minimum response time was 21, maximum was 1108, and median was 38.