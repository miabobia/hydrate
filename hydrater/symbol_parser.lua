-- symbol_parser.lua
local SymbolParser = {}

-- Move forward by line_length
function SymbolParser.forward(x, y, theta, line_length)
    local new_x = x + (line_length * math.cos(theta))
    local new_y = y + (-line_length * math.sin(theta))
    return new_x, new_y
end

-- Rotate positively by angle_increment
function SymbolParser.rotate_pos(theta, angle_increment)
    return theta + angle_increment
end

-- Rotate negatively by angle_increment
function SymbolParser.rotate_neg(theta, angle_increment)
    return theta - angle_increment
end

-- Push the current position to the stack
function SymbolParser.push_to_stack(stack, x, y, theta)
    table.insert(stack, {x, y, theta})
end

-- Pop the last position from the stack
function SymbolParser.pop_from_stack(stack)
    return table.remove(stack)
end

-- Map of symbols to functions
SymbolParser.parser = {
    F = SymbolParser.forward,
    ["+"] = SymbolParser.rotate_pos,
    ["-"] = SymbolParser.rotate_neg,
    ["["] = SymbolParser.push_to_stack,
    ["]"] = SymbolParser.pop_from_stack
}

return SymbolParser
