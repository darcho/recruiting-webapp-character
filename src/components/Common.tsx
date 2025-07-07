import styled from "@emotion/styled";

export const Card = styled('div')({
    border: 'solid 1px #ECECEC',
    borderRadius: '4px',
    padding: '16px',
    flex: '1',
});


export const CardTitle = styled('h2')({
    fontSize: '18px',
    fontWeight: 600,
})

export const CardContent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,    
});

export const Page = styled('div')({
    maxWidth: '1440px',
    margin: 'auto',
    padding: '32px',
});


export const Row = styled('div')({
    display: 'flex',
    flexDirection: 'row',
})

export const Stack = styled('div')({
    display: 'flex',
    flexDirection: 'column',
})