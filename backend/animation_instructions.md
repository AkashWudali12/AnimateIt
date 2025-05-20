# Animation Instructions for Manim

## General Guidelines

1. **Break Up Math Expressions**
   - Always write mathematical expressions as multiple arguments in `MathTex`, not as a single string.
   - This allows you to access and manipulate individual terms or symbols.
   - **Example:**
     ```python
     # Good:
     equation = MathTex("x^2", "+", "3x", "-", "2", "=", "0")
     # Bad:
     equation = MathTex("x^2 + 3x - 2 = 0")
     ```

2. **Access and Highlight Specific Terms**
   - Use indexing or `get_part_by_tex` to underline, color, or animate specific terms.
   - **Example:**
     ```python
     equation[0].set_color(RED)  # 'x^2'
     equation[2].set_color(ORANGE)  # '3x'
     equation[4].set_color(BLUE)  # '-2'
     a_underline = Underline(equation[0]).set_color(RED)
     self.play(Create(a_underline))
     ```

3. **Avoid Overlap by Using Adequate Spacing**
   - When stacking elements vertically, use a larger `buff` value in `.next_to()` (e.g., `buff=0.5` or more).
   - Never stack new elements on top of the same reference with the same `buff` value repeatedly.
   - **Example:**
     ```python
     label1 = MathTex("a = 1").next_to(equation, UP, buff=0.5)
     label2 = MathTex("b = 3").next_to(label1, RIGHT, buff=0.5)
     label3 = MathTex("c = -2").next_to(label2, RIGHT, buff=0.5)
     ```

4. **Anchor New Content to Visible Objects**
   - When introducing a new phase of the animation, anchor new content to a visible, central object (e.g., the main equation or the center of the screen) rather than stacking downward indefinitely.
   - **Example:**
     ```python
     quad_formula = MathTex("x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}").move_to(ORIGIN + UP*1.5)
     self.play(Write(quad_formula))
     ```

5. **Fade Out or Remove Unneeded Objects**
   - Before introducing new content in the same area, fade out or remove previous objects to keep the scene uncluttered.
   - **Example:**
     ```python
     self.play(FadeOut(label1), FadeOut(label2), FadeOut(label3))
     ```

6. **Use Color and Underlines for Emphasis**
   - Use `.set_color()` and `Underline` to highlight important variables or steps in the process.
   - **Example:**
     ```python
     equation[2].set_color(ORANGE)  # Highlight 'b' term
     b_underline = Underline(equation[2]).set_color(ORANGE)
     self.play(Create(b_underline))
     ```

7. **Print and Debug Submobjects**
   - Use `print()` and `enumerate()` to inspect how Manim splits your `MathTex` expressions, especially when debugging indices.
   - **Example:**
     ```python
     for i, submob in enumerate(equation):
         print(i, submob)
     ```

8. **Group Related Labels for Compactness**
   - When possible, group related labels (like coefficients) in a single line for clarity and space efficiency.
   - **Example:**
     ```python
     coeffs = MathTex("a = 1", ",", "b = 3", ",", "c = -2").next_to(equation, UP, buff=0.5)
     self.play(FadeIn(coeffs))
     ```

9. **Use Comments to Clarify Animation Steps**
   - Clearly comment each step of your animation to make the logic and flow easy to follow for both humans and AI.

---

## Example: Highlighting and Labeling Coefficients

```python
# Display the equation with split terms
main_eq = MathTex("x^2", "+", "3x", "-", "2", "=", "0")
self.play(Write(main_eq))

# Underline and color each coefficient
main_eq[0].set_color(RED)      # x^2 (a)
main_eq[2].set_color(ORANGE)   # 3x (b)
main_eq[4].set_color(BLUE)     # -2 (c)
self.play(Create(Underline(main_eq[0]).set_color(RED)),
          Create(Underline(main_eq[2]).set_color(ORANGE)),
          Create(Underline(main_eq[4]).set_color(BLUE)))

# Label coefficients above equation
a_text = MathTex("a = 1").set_color(RED).next_to(main_eq[0], UP, buff=0.5)
b_text = MathTex("b = 3").set_color(ORANGE).next_to(a_text, RIGHT, buff=0.5)
c_text = MathTex("c = -2").set_color(BLUE).next_to(b_text, RIGHT, buff=0.5)
self.play(FadeIn(a_text), FadeIn(b_text), FadeIn(c_text))
```

---

## Summary Table

| Guideline                        | Why It Matters                                  |
|----------------------------------|-------------------------------------------------|
| Split MathTex into terms         | Enables precise highlighting and manipulation   |
| Use adequate buff in next_to     | Prevents overlap and clutter                    |
| Anchor to visible objects        | Keeps content on screen and readable            |
| Fade out unneeded objects        | Maintains clarity and focus                     |
| Use color/underline for emphasis | Directs attention to key concepts               |
| Print submobjects for debugging  | Ensures correct indexing and access             |

---

By following these guidelines, you will generate Manim animations that are clear, visually appealing, and free from common layout issues. 