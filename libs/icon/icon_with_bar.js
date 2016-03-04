import React, {
    StyleSheet,
    Component,
    View,
    Text,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { extendRawIcon } from './raw';

const styles = StyleSheet.create({
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

class IconWithBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: false
        };
    }

    onPress() {
        const { tabName, gotoTab } = this.context;
        gotoTab(tabName);
    }

    tabDidActive() {
        this.setState({selected: true});
        //console.log(`tab ${this.context.tabName} is active`);
    }

    tabDidInactive() {
        this.setState({selected: false});
        //console.log(`tab ${this.context.tabName} is inactive`);
    }

    render() {
        const {
            label,
            iconSource,
            iconSourceOnActive,
            from,
            size,
            iconStyle,
            onActiveColor,
            onInactiveColor,
            onActiveColorBar,
            onInactiveColorBar
            } = this.props;
        const { selected } = this.state;

        const color = selected ? onActiveColor : onInactiveColor
        const barColor = selected ? onActiveColorBar : onInactiveColorBar;
        const borderWidth = 1; // selected? 2 : 1;
        const padding = selected ? 0 : 1;

        let icon = null;
        if (!!iconSource && !iconSourceOnActive) {
            throw new Error("icon must contains 'iconSource' and 'iconSourceOnActive' values");
        } else if (!iconSource && !!iconSourceOnActive) {
            throw new Error("icon must contains 'iconSource' and 'iconSourceOnActive' values");
        } else if (!!iconSource && !!iconSourceOnActive) {
            var source = selected ? iconSource : iconSourceOnActive;
            icon = (<Image source={source}></Image>);
        }

        return (
            <TouchableWithoutFeedback style={{flex: 1}} onPress={this.onPress.bind(this)}>
                <View style={[styles.icon,{borderTopWidth: borderWidth, borderTopColor:barColor, paddingTop: padding}]}>
                    {icon}
                    <View>
                        <Text style={{fontSize: 12}}>
                            {label}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

IconWithBar.propTypes = {
    label: React.PropTypes.string,
    iconSource: React.PropTypes.number,
    iconSourceOnActive: React.PropTypes.number,
    from: React.PropTypes.string,
    size: React.PropTypes.number,
    iconStyle: React.PropTypes.any,
    onActiveColor: React.PropTypes.string,
    onInactiveColor: React.PropTypes.string,
    onActiveColorBar: React.PropTypes.string,
    onInactiveColorBar: React.PropTypes.string
};

IconWithBar.defaultProps = {
    size: 20,
    onActiveColor: 'white',
    onInactiveColor: 'black',
    onActiveColorBar: 'gray',
    onInactiveColorBar: 'gray'
};

IconWithBar.contextTypes = {
    tabName: React.PropTypes.string,
    gotoTab: React.PropTypes.func
};

export default extendRawIcon(IconWithBar);
