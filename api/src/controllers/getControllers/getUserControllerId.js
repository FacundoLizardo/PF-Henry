const { User } = require("../../db");

function cleanUserInfo(user) {
    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      id: user.id,
    };
  }

const getUserControllerId = async (id) => {
    try {
        const user = await User.findOne({
            where: { id: id },
        });

        if (!user) {
            return "User Not Found";
        }
        
        const cleanedUserInfo = cleanUserInfo(user);
        return cleanedUserInfo;
    } catch (error) {
        console.error(error);
    }
};


module.exports = { getUserControllerId };