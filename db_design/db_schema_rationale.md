1. Dietary Reference Intakes (DRI)
    -  Recommended Dietary Allowance (RDA): Average daily level of intake sufficient to meet the nutrient requirements of nearly all (97–98%) healthy individuals; often used to plan nutritionally adequate diets for individuals.

    - Adequate Intake (AI): Intake at this level is assumed to ensure nutritional adequacy; **established when evidence is insufficient to develop an RDA.**

    - Tolerable Upper Intake Level (UL): Maximum daily intake unlikely to cause adverse health effects.

    - Unit is set as enum type to ensure data integrity and efficiency. 

1. Substances
    - has boolean attribute toxin and allergen, which are attributes indicating if the compound is a known toxin allergen, respectively. 
    - If a substance is marked as a toxin, then the Minimum Safe Concentration (MSC) of this substance must be entered. Else, MSC can be left as `null`.  **Constraint should be applied for these two column**.


1. Food Analytical Results
    - is a table that stores the detailed analytical methods of a specified food item. It has a one-to-one relationship to the food items table
    - For performance consideration, this table may not be adopted in the actual implementation. If that's the case, we need to direct users to our data source (but not user friendly...).