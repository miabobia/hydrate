# b/c of coordinate system
# cos must be negative
# sin must be positive

# using this for reference http://www.paulbourke.net/fractals/lsys/

from typing import Tuple, Dict
from dataclasses import dataclass
from math import cos, sin

@dataclass
class Ruleset:
    """
    defines rules for calculating generations of axioms
    """
    ruleset: Dict[str, str]

    def set_ruleset(self, _ruleset: Dict[str, str]):
        self.ruleset = _ruleset

class SymbolParser:
    """
    provides meanings (functions) to symbols use in Ruleset
    eg: F -> go forward
        + -> rotate theta n radians
    """

    @staticmethod
    def forward(**kwargs) -> Tuple[int, int]:
        x, y, theta, line_length = \
            [kwargs.get(symbol) for symbol in ["x", "y", "theta", "line_length"]]

        # using -line_length on sin to account for difference of coordinate systems
        return (
            x + (line_length * cos(theta)),
            y + (-line_length * sin(theta))
        )

    @staticmethod
    def rotate_pos(**kwargs) -> float:
        """
        theta (current angle)
        angle_increment

        returns theta rotated by angle_increment
        """
        return kwargs.get("theta") + kwargs.get("angle_increment")

    @staticmethod
    def rotate_neg(**kwargs) -> float:
        """
        theta (current angle)
        angle_increment

        returns theta rotated by angle_increment
        """
        return kwargs.get("theta") - kwargs.get("angle_increment")

    @staticmethod
    def push_to_stack(**kwargs) -> Tuple[int, int, float]:
        stack, x, y, theta = [kwargs.get(symbol) for symbol in ["stack", "x", "y", "theta"]]
        stack.append(x, y, theta)

    @staticmethod
    def pop_from_stack(**kwargs) -> Tuple[int, int, float]:
        return kwargs.get("stack").pop()



    parser = {
        "F": forward,
        "+": rotate_pos,
        "": rotate_neg,
        "[": push_to_stack,
        "]": pop_from_stack
    }


def get_next_generation(axiom: str, ruleset: Ruleset) -> str:
    """
    takes in an axiom code and a Ruleset
    returns a new axiom code
    `FF+F` -> `FFF+FFF++FFF+`
    """
    new_axiom = ''
    for symbol in axiom:
        if symbol not in ruleset.ruleset:
            new_axiom += symbol
        else:
            new_axiom += ruleset.ruleset.get(symbol)
    return new_axiom

def calculate_point(point: Tuple[int, int], theta: float, dist: int) -> Tuple[int, int]:
    """
    point -> (x1, y1)
    theta -> radians angle to rotate from point (x1, y1)
    dist  -> how far (x1, y1) is from (x2, y2)

    returns (x2, y2)
    """

def main():

    r = Ruleset({
        "F": "F+F-F-FF+F+F-F"
    })

    # print(get_next_generation("F+F+F+F", r))
    print(SymbolParser.parser)
    SymbolParser.parser["F"](x=1, y=2, theta=3, line_length=4)




if __name__ == '__main__': 
    main()