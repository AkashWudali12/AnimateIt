from manim import *

class SolveQuadraticEquation(Scene):
    def construct(self):
        # 1. Display the Problem
        main_eq = MathTex("x^2", "+", "3x", "-", "2", "=", "0")
        main_eq.move_to(ORIGIN)
        self.play(Write(main_eq))
        self.wait(1.0)

        # Highlight and underline terms one at a time
        for idx, color in [(0, RED), (2, ORANGE), (4, BLUE)]:
            self.play(main_eq[idx].animate.set_color(color))
            self.play(Create(Underline(main_eq[idx]).set_color(color)))
            self.wait(0.5)

        # 2. Identify as quadratic equation (with explanation)
        quad_form = MathTex("ax^2", "+", "bx", "+", "c", "=", "0")
        quad_form.next_to(main_eq, UP, buff=0.8)
        quad_explain = Text("This is the standard form of a quadratic equation.", font_size=28).next_to(quad_form, UP, buff=0.4)
        self.play(FadeIn(quad_form))
        self.play(FadeIn(quad_explain))
        self.wait(1.0)

        coeffs = MathTex("a = 1", ",", "b = 3", ",", "c = -2")
        coeffs[0].set_color(RED)
        coeffs[2].set_color(ORANGE)
        coeffs[4].set_color(BLUE)
        coeffs.next_to(main_eq, DOWN, buff=0.8)
        self.play(FadeIn(coeffs))
        self.wait(1.2)

        # Fade out explanation and standard form to clear space
        self.play(FadeOut(quad_explain), FadeOut(quad_form))
        self.wait(0.2)

        # 3. Solution Method choice (separate and clear)
        factoring_title = Text("Step 1: Try Factoring", font_size=36).to_edge(UP)
        quad_formula_title = Text("Step 2: Use Quadratic Formula", font_size=36, color=GREY).next_to(factoring_title, DOWN, buff=0.3)
        self.play(FadeIn(factoring_title))
        self.wait(0.7)

        # 4. Set up factoring form
        factoring_form = MathTex("(", "x", "+", "\\Box", ")", "(", "x", "+", "\\Box", ")", "=", "0")
        factoring_form.next_to(main_eq, DOWN, buff=1.5)
        factoring_explain = Text("Find two numbers that multiply to -2 and add to 3.", font_size=28)
        factoring_explain.next_to(factoring_form, DOWN, buff=0.5)
        self.play(Write(factoring_form))
        self.play(FadeIn(factoring_explain))
        self.wait(1.2)

        # 5. Show possible factor pairs (grouped and fade as a block)
        pairs_group = VGroup(
            MathTex("1", ",", "-2"),
            MathTex("-1", ",", "2"),
            MathTex("2", ",", "-1"),
            MathTex("-2", ",", "1"),
        ).arrange(DOWN, center=False, aligned_edge=LEFT, buff=0.35)
        for i, pair in enumerate(pairs_group):
            if i == 0:
                pair.next_to(factoring_explain, DOWN, buff=0.4)
            pair.align_to(factoring_explain, LEFT)
        highlight_colors = [YELLOW, YELLOW, YELLOW, YELLOW]
        highlight_indices = [1, 2, 1, 0]
        for pair, color, idx in zip(pairs_group, highlight_colors, highlight_indices):
            pair[idx].set_color(color)
        self.play(FadeIn(pairs_group))
        self.wait(1.2)
        # Explanation: No integer solution
        no_fact = Text("No integer pair works. Can't factor.", font_size=28, color=YELLOW).next_to(pairs_group, DOWN, buff=0.5)
        self.play(FadeIn(no_fact))
        self.wait(1.0)

        # Fade out all factoring step elements
        self.play(
            FadeOut(factoring_form),
            FadeOut(factoring_explain),
            FadeOut(pairs_group),
            FadeOut(no_fact),
            FadeOut(factoring_title),
            FadeOut(coeffs),
            FadeOut(quad_form),
            FadeOut(main_eq)
        )
        self.wait(0.2)

        # 6. Quadratic Formula setup (move up and explain)
        self.play(quad_formula_title.animate.set_color(WHITE).scale(1.1).to_edge(UP))
        quad_formula = MathTex(r"x = \frac{ -b \pm \sqrt{ b^2 - 4ac } }{ 2a }")
        quad_formula.move_to(ORIGIN + UP*2)
        quad_formula_explain = Text("The quadratic formula can solve any quadratic equation.", font_size=28).next_to(quad_formula, DOWN, buff=0.4)
        self.play(Write(quad_formula))
        self.play(FadeIn(quad_formula_explain))
        self.wait(1.2)

        # 7. Substitute a, b, c (highlighted and explained)
        self.play(FadeOut(quad_formula_explain))
        substitution = MathTex(
            r"x = \frac{ -3 \pm \sqrt{ 3^2 - 4 \cdot 1 \cdot (-2) } }{ 2 \cdot 1 }"
        ).next_to(quad_formula, DOWN, buff=0.9)
        substitution.set_color_by_tex("3", ORANGE)
        substitution.set_color_by_tex("1", RED)
        substitution.set_color_by_tex("-2", BLUE)
        substitution_explain = Text("Substitute a, b, and c.", font_size=28).next_to(substitution, DOWN, buff=0.4)
        self.play(Write(substitution))
        self.play(FadeIn(substitution_explain))
        self.wait(1.2)
        self.play(FadeOut(substitution_explain))

        # 8. Simplify the discriminant (step by step, stacked)
        disc_text = Text("Let's simplify the part under the square root.", font_size=28).next_to(substitution, DOWN, buff=0.5)
        self.play(FadeIn(disc_text))
        self.wait(0.7)
        b2 = MathTex("3^2 = 9").next_to(disc_text, DOWN, buff=0.5)
        self.play(Write(b2))
        self.wait(0.5)
        a_times_c = MathTex("4 \\cdot 1 \\cdot (-2) = -8").next_to(b2, DOWN, buff=0.5)
        self.play(Write(a_times_c))
        self.wait(0.7)
        disc_value = MathTex("9 - (-8) = 9 + 8 = 17").next_to(a_times_c, DOWN, buff=0.5)
        self.play(Write(disc_value))
        self.wait(1.0)

        # Fade out all discriminant simplification elements
        self.play(FadeOut(disc_text), FadeOut(b2), FadeOut(a_times_c), FadeOut(disc_value))

        # 9. Substitute back simplified discriminant
        simplified = MathTex(
            r"x = \frac{ -3 \pm \sqrt{17} }{ 2 }"
        ).next_to(substitution, DOWN, buff=1.0)
        simplified_explain = Text("This gives us two possible values for x.", font_size=28).next_to(simplified, DOWN, buff=0.4)
        self.play(Write(simplified))
        self.play(FadeIn(simplified_explain))
        self.wait(1.2)
        self.play(FadeOut(simplified_explain), FadeOut(substitution), FadeOut(quad_formula), FadeOut(quad_formula_title))

        # 10. Write both solutions (vertical, not overlapping)
        sol1 = MathTex(
            r"x_1 = \frac{ -3 + \sqrt{17} }{ 2 }"
        ).set_color(GREEN)
        sol2 = MathTex(
            r"x_2 = \frac{ -3 - \sqrt{17} }{ 2 }"
        ).set_color(PURPLE)
        sol_group = VGroup(sol1, sol2).arrange(DOWN, center=False, aligned_edge=LEFT, buff=0.5).next_to(simplified, DOWN, buff=0.8)
        self.play(Write(sol_group))
        self.wait(1.2)

        # Fade out all previous math that isn't needed anymore
        self.play(FadeOut(main_eq), FadeOut(coeffs), FadeOut(simplified))

        # 11. Approximate the answers
        approx_text = Text("Approximating the solutions:", font_size=28).next_to(sol_group, DOWN, buff=0.5)
        approx1 = MathTex(r"x_1 \approx 0.56").set_color(GREEN).next_to(approx_text, DOWN, buff=0.4).align_to(sol1, LEFT)
        approx2 = MathTex(r"x_2 \approx -3.56").set_color(PURPLE).next_to(approx1, DOWN, buff=0.4).align_to(sol2, LEFT)
        self.play(FadeIn(approx_text))
        self.play(Write(approx1), Write(approx2))
        self.wait(1.2)

        # 12. Box the final answers
        box1 = SurroundingRectangle(sol1, color=YELLOW, buff=0.2)
        box2 = SurroundingRectangle(sol2, color=YELLOW, buff=0.2)
        self.play(Create(box1), Create(box2))
        self.wait(0.8)

        # 13. Final "Solved!" message
        solved = Text("Solved!", font_size=40, color=YELLOW).next_to(approx2, DOWN, buff=1.0)
        self.play(Write(solved))
        self.wait(2.0)

        # Fade out everything except final boxes and 'Solved!'
        self.play(
            FadeOut(sol_group),
            FadeOut(approx_text),
            FadeOut(approx1),
            FadeOut(approx2),
            FadeOut(box1),
            FadeOut(box2),
            FadeOut(solved)
        )
