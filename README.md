# React Assessment

The goal of this assessment is to gauge your ability to write a React component along with the accompanying HTML and CSS. Fork this respository and include all of your work in that fork. When you're finished, send us the URL of your forked repo.

### Component

![react-assessment](https://raw.githubusercontent.com/thirteen23/react-assessment/master/react-assessment.png)

### Specifications

Create the above component. When the application loads fetch the [terminals.json](terminals.json) file. Store the information in some kind of state store (Redux, MobX, etc.) and then render the component with the following calculations. Assume that today is 2018-01-01.

Current inventory = inventory at the end of today (current inventory - forecasted volume out + forecasted volume in)

Days supply to minimum inventory = the difference in days between today and when (inventory - forecasted volume out + forecasted volume in) will go below the minimum. if the volume never goes below the minimum display `> 30`.

Forecast volume in = the sum of all volume in

Forecast EOM closing inventory = today's inventory - the sum of all volume out + the sum of all volume in for the month

#### Colors

Text and dark border: #2C2A52

Green indicator: #11DCAE

Border and dividing gray: #EEE

Bottom gray bar: #E3E3E3
