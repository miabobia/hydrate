local https = require "https"
local json = require("json")

local apiHandler = {}

function apiHandler:dumpTable(tbl, indent)
    indent = indent or 0
    for k, v in pairs(tbl) do
        print(string.rep(" ", indent) .. tostring(k) .. ":")
        if type(v) == "table" then
            self:dumpTable(v, indent + 2)
        else
            print(string.rep(" ", indent + 2) .. tostring(v))
        end
    end
end

function apiHandler:getColor(colorID)
	local code, body, headers = https.request("http://localhost:3000/color/"..colorID, {method = "get", headers = {}, data = ""})

    -- assert(code == 200 and headers, body)

	-- for i, v in pairs(headers) do
	-- 	print(i, v)
	-- end
	if code == 200 then
        self:dumpTable(json.decode(body).data, 1)
        return json.decode(body).data
    end
end

return apiHandler