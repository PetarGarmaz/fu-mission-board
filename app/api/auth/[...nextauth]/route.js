import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import {connectToDB} from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: "https://discord.com/api/oauth2/authorize?client_id=1178425200417701940&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&scope=identify+guilds+email",
			token: "https://discord.com/api/oauth2/token",
            userinfo: "https://discord.com/api/users/@me",
		})
	],
	callbacks: {
		async session({session, token}) {
			const sessionUser = await User.findOne({email: session.user.email});
			
			session.accessToken = token.access_token;
			session.user.id = sessionUser._id.toString();
			return session;
		},

		async jwt({ token, account }){
			if (account) {
				token.accessToken = account.access_token;
				token = Object.assign({}, token, { access_token: account.access_token });				
			}

			return token;
		},


		async signIn({account, user}) {
			var returnValue = false;

			try {
				await connectToDB();

				const userExists = await User.findOne({email: user.email});
				const guildResponse = await fetch("https://discord.com/api/users/@me/guilds", {headers: {Authorization: "Bearer " + account.access_token}});
				const guilds = await guildResponse.json();

				for (let i = 0; i < guilds.length; i++) {
					if(guilds[i].id == "282514718445273089") {
						returnValue = true;
					};
				}

				if(!userExists && returnValue) {
					await User.create({
						email: user.email,
						username: user.name,
						image: user.image
					})
				}

				return returnValue;
			} catch (error) {
				console.log("Error checking if user exists:\n- ", error.message);
				return returnValue;
			}
		}
	}
})

export {handler as GET, handler as POST};