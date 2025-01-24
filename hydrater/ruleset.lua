-- ruleset.lua

local Ruleset = {}
-- __index means everytime we make a metatable of Ruleset it inherits functions of Ruleset
Ruleset.__index = Ruleset

function Ruleset.new(ruleset)
    local self = setmetatable({}, Ruleset)
    self.ruleset = ruleset or {}
    return self
end

-- overwrite ruleset
function Ruleset:set_ruleset(_ruleset)
    self.ruleset = _ruleset
end

return Ruleset
