import ChannelModel from '@/Model/channel';

class ChannelParser {
    public static parse(channels: any[]) {
        if (channels) {
            channels.forEach((channel: any) => {
                ChannelParser.channels.push(new ChannelModel(channel.id, channel.name, channel.icon));
            });
        }
    }

    public static getChannels(channels: number[]): ChannelModel[] {
        return ChannelParser.channels.filter((model: ChannelModel) => {
            channels.forEach((channel) => {
                return model.getId() === channel;
            });
        });
    }

    private static channels: ChannelModel[] = [];
}

export default ChannelParser;
