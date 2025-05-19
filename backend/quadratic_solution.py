from manim import *

class QuadraticEquationSolver(Scene):
    def construct(self):
        # 1. Display the original equation
        equation = MathTex("x^2 + 3x - 2 = 0")
        self.play(Write(equation))
        self.wait(1)
        self.play(Indicate(equation, scale_factor=1.2))
        self.wait(1.2)
        
        # 2. Identify coefficients
        a_label = Tex("a = 1").next_to(equation[0], UP)
        b_label = Tex("b = 3").next_to(equation[2:4], UP)
        c_label = Tex("c = -2").next_to(equation[5:], UP)
        self.play(FadeIn(a_label))
        self.wait(0.5)
        self.play(FadeIn(b_label))
        self.wait(0.5)
        self.play(FadeIn(c_label))
        self.wait(1)
        
        # 3. State the goal
        goal = Tex("We will factor the quadratic equation.").next_to(equation, DOWN)
        underline = Underline(goal[11:28]).set_color(YELLOW)
        self.play(FadeIn(goal))
        self.wait(0.5)
        self.play(Create(underline))
        self.wait(1)
        
        # 4. Set up factoring structure
        factoring = MathTex("(x \\quad )(x \\quad ) = 0").next_to(goal, DOWN, buff=1.2)
        self.play(FadeOut(a_label), FadeOut(b_label), FadeOut(c_label))
        self.wait(0.4)
        self.play(FadeIn(factoring))
        self.play(Indicate(factoring, color=BLUE), run_time=0.8)
        self.wait(1)
        
        # 5. Highlight middle term (b = 3)
        middle_underline = Underline(equation[2:4]).set_color(ORANGE)
        self.play(Create(middle_underline))
        sum_text = Tex("Find two numbers that multiply to $-2$ and add to $3$").next_to(factoring, DOWN)
        self.play(FadeIn(sum_text))
        self.wait(1.2)

        # 6. Show product and sum requirements
        product = Tex("Product: $a \\times c = 1 \\times (-2) = -2$").next_to(sum_text, DOWN)
        sum_ = Tex("Sum: $b = 3$").next_to(product, DOWN)
        self.play(FadeIn(product))
        self.wait(0.5)
        self.play(FadeIn(sum_))
        self.wait(1.5)

        # 7. List factor pairs of -2
        pairs_title = Tex("Factor pairs of $-2$:").next_to(sum_, DOWN, buff=1.0)
        pair1 = Tex("1, $-2$ \\,\\rightarrow 1 + (-2) = -1").next_to(pairs_title, DOWN)
        pair2 = Tex("$-1$, 2 \\,\\rightarrow -1 + 2 = 1").next_to(pair1, DOWN)
        self.play(FadeIn(pairs_title))
        self.wait(0.5)
        self.play(FadeIn(pair1))
        self.wait(1)
        self.play(FadeIn(pair2))
        self.wait(1.5)

        # 8. Gray incorrect pairs, transition to quadratic formula
        self.play(pair1.animate.set_opacity(0.4), pair2.animate.set_opacity(0.4))
        formula_fail = Tex("No pair adds to $3$. Try another approach: Quadratic Formula.").next_to(pair2, DOWN, buff=1.0)
        self.play(FadeIn(formula_fail))
        self.wait(2)
        self.play(FadeOut(goal), FadeOut(underline), FadeOut(factoring), FadeOut(sum_text),
                  FadeOut(product), FadeOut(sum_), FadeOut(pairs_title), FadeOut(pair1), FadeOut(pair2), FadeOut(formula_fail))
        self.wait(1)

        # 9. Introduce quadratic formula
        quad_formula = MathTex("x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}")
        self.play(Write(quad_formula))
        self.play(Indicate(quad_formula, color=YELLOW))
        self.wait(1.5)

        # 10. Substitute values
        subs = MathTex(
            "a=1,\\quad b=3,\\quad c=-2"
        ).next_to(quad_formula, DOWN)
        self.play(FadeIn(subs))
        self.wait(1.2)
        formula_subs = MathTex(
            "x = \\frac{-(3) \\pm \\sqrt{(3)^2 - 4(1)(-2)}}{2 \\times 1}"
        ).next_to(subs, DOWN, buff=0.8)
        self.play(Write(formula_subs))
        self.wait(2)

        # 11. Calculate inside the square root
        # Highlight (3)^2
        highlight_32 = SurroundingRectangle(formula_subs[0][16:20], color=BLUE, buff=0.05)
        self.play(Create(highlight_32))
        self.wait(0.8)
        three_sq = Tex("$(3)^2 = 9$").next_to(formula_subs, DOWN)
        self.play(FadeIn(three_sq))
        self.wait(1.1)
        self.play(FadeOut(three_sq), FadeOut(highlight_32))

        # Highlight 4*1*-2
        highlight_mult = SurroundingRectangle(formula_subs[0][21:30], color=BLUE, buff=0.05)
        self.play(Create(highlight_mult))
        self.wait(0.8)
        four_prod = Tex("$4 \\times 1 \\times -2 = -8$").next_to(formula_subs, DOWN)
        self.play(FadeIn(four_prod))
        self.wait(1.1)
        self.play(FadeOut(four_prod), FadeOut(highlight_mult))

        # 12. Simplify discriminant
        arrow = Arrow(formula_subs.get_right(), formula_subs.get_right() + RIGHT*2, buff=0.1)
        disc = Tex("$9 - (-8) = 17$").next_to(formula_subs, RIGHT, buff=1.1)
        self.play(GrowArrow(arrow), FadeIn(disc))
        self.wait(1.4)
        self.play(FadeOut(arrow), FadeOut(disc))

        # 13. Write new formula with simplified values
        simplified = MathTex(
            "x = \\frac{-3 \\pm \\sqrt{17}}{2}"
        ).next_to(formula_subs, DOWN, buff=0.8)
        self.play(Write(simplified))
        self.wait(1.8)

        # 14. Split into two solutions
        sol1 = MathTex("x_1 = \\frac{-3 + \\sqrt{17}}{2}").next_to(simplified, DOWN, aligned_edge=LEFT)
        sol2 = MathTex("x_2 = \\frac{-3 - \\sqrt{17}}{2}").next_to(sol1, DOWN, aligned_edge=LEFT)
        self.play(Write(sol1))
        self.wait(0.8)
        self.play(Write(sol2))
        self.wait(2)

        # 15. Show final answer
        final_text = Tex("Final solutions:").set_color(YELLOW).next_to(sol1, LEFT, buff=1.0)
        box1 = SurroundingRectangle(sol1, color=GREEN, buff=0.12)
        box2 = SurroundingRectangle(sol2, color=GREEN, buff=0.12)
        check1 = Tex("\\checkmark").set_color(GREEN).scale(1.2).next_to(sol1, RIGHT)
        check2 = Tex("\\checkmark").set_color(GREEN).scale(1.2).next_to(sol2, RIGHT)
        self.play(FadeIn(final_text))
        self.wait(0.8)
        self.play(Create(box1), Create(box2), FadeIn(check1), FadeIn(check2))
        self.wait(2.2)

        # 16. End with summary
        everything = VGroup(equation, quad_formula, subs, formula_subs, simplified, sol1, sol2, box1, box2, check1, check2, final_text)
        self.play(*[FadeOut(mob) for mob in everything if mob is not sol1 and mob is not sol2 and mob is not box1 and mob is not box2 and mob is not check1 and mob is not check2], run_time=1.5)
        self.wait(0.5)
        final_box = SurroundingRectangle(VGroup(sol1, sol2), color=YELLOW, buff=0.18)
        summary = Tex("Quadratic equation solved by the quadratic formula.").next_to(final_box, DOWN, buff=1.2)
        self.play(Create(final_box))
        self.wait(0.7)
        self.play(Write(summary))
        self.wait(2.5)
