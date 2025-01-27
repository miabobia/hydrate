local component = require 'badr'
local button = require 'components.button'
local textBox = require 'components.textBox'
local loginMenu


function setupLoginMenu()
    love.graphics.setBackgroundColor({ 1, 1, 1 })
    local clicks = 0
    menu = component { column = true, gap = 10 }
        + button {
            text = 'New game',
            width = 200,
            onHover = function()
                print 'mouse entered'
                return function()
                    print('mouse exited')
                end
            end
        }
        + button { 
            text = 'Settings',
            width = 200,
            onClick = function(self)
                print('settings')
            end
        }
        + textBox { text = '', width = 200}
        + button { text = 'Credits', width = 200 }
        + button { text = 'Quit', width = 200, onClick = function() love.event.quit() end }
        + button {
            text = 'Clicked: 0',
            width = 200,
            onClick = function(self)
                clicks = clicks + 1
                self.text = 'Clicked: ' .. clicks
            end
        }
        + button {
            text = 'Click to remove',
            onClick = function(self)
                self.parent = self.parent - self
                love.mouse.setCursor()
            end
        }

    menu:updatePosition(
        love.graphics.getWidth() * 0.5 - menu.width * 0.5,
        love.graphics.getHeight() * 0.5 - menu.height * 0.5
    )

    return menu
end

return setupLoginMenu()